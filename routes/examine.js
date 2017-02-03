var express = require('express');
var router = express.Router();
var util = require('util');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send("ok");
});

router.post('/', function(req, res, next) {

    var matrix = JSON.parse(req.body.matrix);

    var words = require('../lib/examiner')(matrix);

    res.send({"words" : words});

});

module.exports = router;
