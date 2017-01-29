var redis = require("redis"),
    client = redis.createClient();

var search = function(word,callback)
{
    client.get(word, function(err, reply) {
        // reply is null when the key is missing
        console.log(reply);
    });

};

module.exports = search;