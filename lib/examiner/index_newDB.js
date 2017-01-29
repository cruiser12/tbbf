var fs = require('fs');
var path = require('path');
var file = path.join(__dirname, '../../data', 'newDB.redis');

var newDB = function(db)
{
    db.query("SELECT word FROM german WHERE length(word) < 13", function(err,result){
        result.forEach(function(r) {
            for (i = 2; i <= r.word.length; i++) {
                var key;
                if (r.word.length == 2)
                {
                    key = r.word;
                    value = r.word;
                }
                else
                {
                    var key = r.word.substring(0, i).toUpperCase();
                    if (i == r.word.length) {
                        value = r.word.toUpperCase();
                    }
                    else {
                        value = 1
                    }
                }

                //var string = "INSERT INTO newgerman (key,value) VALUES ('"+key + "','" + value+"');";


                console.log(string);
                fs.appendFileSync(file, string + '\r\n');
            }
        });
    })
}
module.exports = newDB;