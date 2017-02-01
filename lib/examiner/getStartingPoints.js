var getStartingPoints = function(matrix)
{
    var startingPoints = [];
    for(var i = 0; i < matrix.length; i++)
    {
        for(var j = 0; j < matrix[i].length; j++)
        {
            if (matrix[i][j] != '-') startingPoints.push([i,j]);
        }
    }
    return startingPoints;
}
module.exports = getStartingPoints;