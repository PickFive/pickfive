// Strategies
var localSignupStrategy = require('./local-signup-strategy');
var localLoginStrategy  = require('./local-login-strategy');
var facebookStrategy    = require('passport-facebook').Strategy;

var User = require('../../app/models/user');

var configAuth = require('./auth');

module.exports = function(passport) {

  // Strategies
  passport.use('local-signup', localSignupStrategy);
  passport.use('local-login' , localLoginStrategy);

  // Session Support
  passport.serializeUser(function(user, callback) {
    callback(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
      callback(err, user);
    });
  });

  // Facebook
  passport.use(new facebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL
  },

  function (token, refreshToken, profile, done) {
    User.findOrCreate({facebookId: profile.id}, function (err, user) {
      return done(err, user);
    });
  }));
};
