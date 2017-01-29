var fs = require('fs');
var path = require('path');

var saveFoundWordToFile = function(word,callback)
{
    var file = path.join(__dirname, '../../data', 'wordlist.txt');
    fs.appendFileSync(file, word[0]+'-'+JSON.stringify(word[1])+'\r\n');
    return false;
};
module.exports = saveFoundWordToFile;