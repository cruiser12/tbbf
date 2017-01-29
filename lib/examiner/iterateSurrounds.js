var redis = require("redis"),
    client = redis.createClient();
var getSurrounds = require('./getSurrounds');

var iterateSurrounds = function(matrix,surrounds,pathSoFar,maximumWordLength)
{
    for(var i = 0; i < surrounds.length; i++)
    {
        pathSoFar.push(surrounds[i]);
        var word = require('./getWordFromPath')(matrix,pathSoFar);
        console.log(word);

        if (pathSoFar.length < maximumWordLength)
        {
            var _surrounds = getSurrounds(matrix, surrounds[i], pathSoFar);
            if (_surrounds.length > 0)
            {
                iterateSurrounds(matrix,_surrounds, pathSoFar,maximumWordLength);
                pathSoFar.pop();
            }
            else
            {
                pathSoFar.pop();
            }
        }
        else {
            pathSoFar.pop();
        }
    }
};

module.exports = iterateSurrounds;