var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next)
{
    var db = req.app.get('db');

    var matrix =
        [
            ['T','Z','O','S','S','E'],
            ['E','L','A','T','A','C'],
            ['R','E','W','U','H','H'],
            ['K','L','S','F','N','L'],
            ['E','E','T','T','E','G'],
            ['S','D','E','E','L','N'],
            ['T','E','A','N','E','E']
        ];

    var words = require('../lib/examiner')(db,matrix);

    console.log(words);

    res.render('index', { title: 'Express' });
});

module.exports = router;
