var async = require('async');
//var redis = require("redis"),
//    client = redis.createClient();

var examiner = function(matrix)
{
    var getSurrounds = require('./getSurrounds');
    var path = [];
    var words = [];
    var location = [0,0];
    var maximumWordLength = 12;

    var iterateSurrounds = function(surrounds,pathSoFar)
    {

        for (i=0;i<=surrounds.length;i++)
        {
            pathSoFar.push(surrounds[i]);
            var word = require('./getWordFromPath')(matrix, pathSoFar);
            var result = require('../examiner/searchForWordLocally')(require('../../data/words2'), word);

            if (result == false) {
                delete surrounds[i];

            }
            else if (result == "HIT") {
                console.log(word);
                words.push({
                    word: word,
                    path: JSON.stringify(pathSoFar)
                });
            }
            pathSoFar.pop();
        };

        surrounds.forEach(
            function(s)
            {
                if (s !== undefined)
                {
                    pathSoFar.push(s);

                    if (pathSoFar.length<=maximumWordLength)
                    {
                        var _surrounds = getSurrounds(matrix,s,pathSoFar);
                        if (_surrounds.length>0)
                        {
                            iterateSurrounds(_surrounds,pathSoFar);
                            pathSoFar.pop();
                        }
                        else
                        {
                            pathSoFar.pop();
                        }
                    }
                    else
                    {
                        pathSoFar.pop();
                    }

                }
            }
        );
    };

    require('./getStartingPoints')(matrix)
        .forEach(
            function(location)
            {
                var _surrounds = getSurrounds(matrix,location,[]);
                if (_surrounds.length>0)
                {
                    iterateSurrounds(_surrounds,[location]);
                }
            }
        );

    words.sort(function(a, b){return b.word.length-a.word.length});

    return words;

};

module.exports = examiner;
