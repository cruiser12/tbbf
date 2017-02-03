var _ = require('lodash');

var createJsonDB = function(file,callback)
{
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(file)
    });
    var db = [];

    lineReader.on('line', function (line) {

        var last = {1:1};
        for(i=line.length-1;i>=0;i--)
        {
            var arr = {};
            arr[line[i]] = last;
            last = arr;
        }
        //console.log(last);
        db.push(last);
    });
    lineReader.on('close', function () {

        var newDB = {};

        for (i=0;i<=db.length;i++)
        {
            console.log(db[i]);
            _.merge(newDB,db[i]);
        }

        return callback(null,newDB);
    });

}
module.exports = createJsonDB;