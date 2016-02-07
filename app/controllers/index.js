var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Raive' });
});

router.get('/signup', function (req, res, next) {
  res.render('users/signup', {message: req.flash() });
});

router.get('/signin', function (req, res, next) {
  res.render('users/signin', {message: req.flash() });
});

module.exports = router;
