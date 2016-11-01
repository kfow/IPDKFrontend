var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/search', function(req, res, next) {
    res.render('search');
});

router.get('/results', function(req, res, next) {
    res.render('results');
});

router.get('/admin', function(req, res, next) {
    res.render('admin');
});

router.get('/vue', function(req, res, next) {
    res.render('VueTest');
});

module.exports = router;
