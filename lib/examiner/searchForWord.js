var search = function(db,word,callback)
{
    //return callback(false,[{word:'true'}]);
    var query = "SELECT * FROM german WHERE UPPER(word) = '"+word.toUpperCase()+"'";
    db.query(
        query,
        function(error,results,fields)
        {
            if (error) return callback(true,error);

            return callback(false,results);
        }
    );

};

module.exports = search;