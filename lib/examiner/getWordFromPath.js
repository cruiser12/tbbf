var getWordFromPath = function(matrix,path)
{
    var word = '';
    for(var i = 0; i < path.length; i++)
    {
        word += matrix[path[i][0]][path[i][1]];
    }
    return word;
};
module.exports=getWordFromPath;