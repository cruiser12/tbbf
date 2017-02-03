var async = require('async');
var redis = require("redis"),
    client = redis.createClient();

var examiner = function(db,matrix, callback)
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

                var possible_found = {
                    word: word,
                    path: JSON.stringify(pathSoFar)
                };

                client.get("LIKE_"+word,function(err, reply)
                {
                    if (err) throw new Error('db error');
                    if (reply==null)
                    {
                        delete surrounds[key];
                        pathSoFar.pop();
                        return next();
                    }
                    else
                    {

                        client.get("HIT_"+word,function(err, reply) {
                            if (reply==1)
                            {
                                words.push(possible_found);
                                //require('./saveFoundWordToFile')([word,pathSoFar]);
                            }
                        });
                        pathSoFar.pop();
                        return next();
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
            return callback(null,words);
        }
    );
};

module.exports = examiner;
