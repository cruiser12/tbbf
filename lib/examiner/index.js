var async = require('async');
var redis = require("redis"),
    client = redis.createClient();

var examiner = function(db,matrix)
{
    var getSurrounds = require('./getSurrounds');
    var path = [];
    var words = [];
    var location = [0,0];
    var maximumWordLength = 12;

    var iterateSurrounds = function(surrounds,pathSoFar,callback)
    {
        async.eachOfSeries(
            surrounds,
            function(s,key,next)
            {
                pathSoFar.push(s);
                var word = require('./getWordFromPath')(matrix,pathSoFar);
                require('./searchForWordStarting')(db,word,function(err,results)
                {
                    if (err) throw new Error('db error');
                    if (results[0].count==0)
                    {
                        delete surrounds[key];
                        pathSoFar.pop();
                        return next();
                    }
                    else
                    {
                        client.get(word,function(err, reply) {
                            if (reply==1)
                            {
                                console.log(word);
                                require('./saveFoundWordToFile')([word,pathSoFar]);
                            }
                        });
                        pathSoFar.pop();
                        next();
                    }

                });
            },
            function(err,result)
            {

                async.eachSeries(
                    surrounds,
                    function(s,next)
                    {
                        if (s === undefined)
                        {
                            return next();
                        }
                        pathSoFar.push(s);

                        if (pathSoFar.length<=maximumWordLength)
                        {

                            var _surrounds = getSurrounds(matrix,s,pathSoFar);
                            if (_surrounds.length>0)
                            {
                                setTimeout(
                                    function()
                                    {
                                        iterateSurrounds(_surrounds,pathSoFar,function()
                                            {
                                                pathSoFar.pop();
                                                return next();
                                            }
                                        );
                                    },
                                    0
                                );

                            }
                            else
                            {
                                pathSoFar.pop();
                                return next();
                            }
                        }
                        else {
                            pathSoFar.pop();
                            return next();
                        }
                    },
                    function(err,result)
                    {
                        return callback();
                    }
                );
            }
        );
    };

    var startingPoints = require('./getStartingPoints')(matrix);

    async.each(
        startingPoints,
        function(location,next)
        {
            var _surrounds = getSurrounds(matrix,location,[]);
            if (_surrounds.length>0)
            {
                iterateSurrounds(_surrounds,[location],function()
                    {
                        return next();
                    }
                );
            }
            else
            {
                return next();
            }
        },
        function()
        {
            words.sort(function(a, b){return b.word.length-a.word.length});
            console.log(words);
            return words;
        }
    );
};

module.exports = examiner;
