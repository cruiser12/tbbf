var express = require('express');
var router = express.Router();
var util = require('util');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send("ok");
});

router.post('/', function(req, res, next) {

    var db = req.app.get('db');

    var matrix = JSON.parse(req.body.matrix);

    var words = require('../lib/examiner')(db,matrix,function(err,result)
    {
        res.send({"words" : result});
    });


});

module.exports = router;
