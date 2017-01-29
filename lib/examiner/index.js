var examiner = function(db,matrix)
{
    var getSurrounds = require('./getSurrounds');
    var path = [];
    var words = [];
    var location = [0,0];
    var maximumWordLength = 12;

    var startingPoints = require('./getStartingPoints')(matrix);

    for(var i = 0; i < startingPoints.length; i++)
    {
        var _surrounds = getSurrounds(matrix,startingPoints[i],[]);
        if (_surrounds.length>0)
        {
            require('./iterateSurrounds')(matrix,_surrounds,[startingPoints[i]],maximumWordLength);
        }
    }

};

module.exports = examiner;
