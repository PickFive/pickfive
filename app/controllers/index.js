var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Raive' });
});

// Sign Up / Sign In Routes
router.get('/signup', function (req, res, next) {
  res.render('users/signup', {message: req.flash(), action: 'signup' });
});

router.post('/signup', function (req, res, next) {
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true,
    successFlash: true
  });

  return signUpStrategy(req, res, next);
});

router.get('/signin', function (req, res, next) {
  res.render('users/signin', {message: req.flash(), action: 'signin' });
});

router.post('/signin', function (req, res, next) {
  var signInProperty = passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true,
    successFlash: true
  });

  return signInProperty(req, res, next);
});

router.get('/signout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/'
    }));

module.exports = router;
