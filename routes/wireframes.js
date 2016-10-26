var express = require('express');
var router = express.Router();

/* GET wireframes listing. */
router.get('/', function(req, res, next) {
    res.render('wireframes/index')
});

router.get('/search', function(req, res, next) {
    res.render('wireframes/search')
});

router.get('/results', function(req, res, next) {
    res.render('wireframes/results')
});

module.exports = router;