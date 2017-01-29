var search = function(db,word,callback)
{
    //return callback(false,[{word:'true'}]);
    var query = "SELECT count(*) AS count FROM german WHERE UPPER(word) LIKE '"+word.toUpperCase()+"%'";
    db.query(
        query,
        function(error,results,fields)
        {
            if (error) return callback(true,error);
            //console.log(query,results);
            return callback(false,results);
        }
    );

};

module.exports = search;