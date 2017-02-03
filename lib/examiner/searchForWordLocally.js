var search = function(db,word)
{
    string = "db";
    for (i=0;i<word.length;i++)
    {
        string+="['"+word[i]+"']";
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