var LocalStrategy = require('passport-local').Strategy;
var User = require('../../app/models/user');

var strategy = new LocalStrategy({
    usernameField : 'username',       // default is 'username'
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, username, password, callback) {
    // Search for a user with this username
    User.findOne({ 'local.username' : username }, function(err, user) {
      if (err) return callback(err);

      // If no user is found
      if (!user) {
        return callback(null, false, req.flash('error', 'User not found.'));
      }

      // Validate password
      if (!user.isValidPassword(password)) {
        return callback(null, false, req.flash('error', 'Oops! Wrong password.'));
      }
      return callback(null, user);
    });
  });

module.exports = strategy;
