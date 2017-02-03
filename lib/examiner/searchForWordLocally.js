var search = function(db,word)
{
    var dbentry = db;
    for (i=0;i<=word.length;i++)
    {
        dbentry = dbentry[word[i]];
    }
    if (dbentry == {})
        return true;
    else
        return false;
};

module.exports = search;