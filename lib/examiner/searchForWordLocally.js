var search = function(db,word)
{
    string = "db";
    for (j=0;j<word.length;j++)
    {
        string+="['"+word[j]+"']";
    }

    found = eval(string);

    if (typeof found === 'object')
    {
        if (found[1] !== undefined )
            return "HIT";
        else
            return "LIKE"
    }
    else return false;
};

module.exports = search;