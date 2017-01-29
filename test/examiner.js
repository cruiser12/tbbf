/**
 * Created by christian.hiller on 27.01.17.
 */
var assert = require('assert');
describe('Examiner', function() {

    var matrix = require('./fixtures/matrix');
    //var path = require('../lib/examiner')(matrix);

    describe('getSurrounds', function() {

        var matrix = require('./fixtures/matrix');
        var location = [0,4];
        var path = [];
        var surrounds = require('../lib/examiner/getSurrounds')(matrix,location,path);

        it('should return -1 when the value is not present', function() {
            //console.log(surrounds);
        });
    });

    describe('getWordFromPath',function()
    {
        var matrix = require('./fixtures/matrix');
        var path = [ [0,0] , [1,0] , [1,1] , [2,1] ];
        var word = require('../lib/examiner/getWordFromPath')(matrix,path);

        it('should return the word TELE', function() {
            console.log(word);
        });

    })

    describe('searchForWord',function()
    {
        it('should find 1 word', function(done)
        {
            var mysql = require('mysql');
            var dbconfig = require('../config/db');
            var db = mysql.createConnection(dbconfig);
            db.connect();

            var word = "über";
            var query = require('../lib/examiner/searchForWord');
            query(
                db,
                word,
                function(error,result)
                {
                    console.log(result[0].word);
                    done();
                }
            );
        });

    });

    describe('searchForWordStarting',function()
    {
        it('should find words', function(done)
        {
            var mysql = require('mysql');
            var dbconfig = require('../config/db');
            var db = mysql.createConnection(dbconfig);
            db.connect();

            var word = "tz";
            var query = require('../lib/examiner/searchForWordStarting');
            query(
                db,
                word,
                function(error,result)
                {
                    console.log(result);
                    done();
                }
            );
        });

    });

    describe('searchForWordRedis',function()
    {
        it('should find 1 word', function(done)
        {
            var word = "EDEL";

            var redis = require("redis"),
                client = redis.createClient();
            client.get(word,function(err, reply) {
                // reply is null when the key is missing
                console.log(reply);
                done();
            });
            /*
             var query = require('../lib/examiner/searchForWordRedis');
             query(
             word,
             function(error,result)
             {
             console.log(result);
             done();
             }
             );
             */

        });

    })

    describe('getStartingPoints',function()
    {
        it('should get 42', function(done)
        {
            var matrix = require('./fixtures/matrix');
            var startingpoints = require('../lib/examiner/getStartingPoints')(matrix);
            console.log(startingpoints.length);
            done()
        });

    })

});