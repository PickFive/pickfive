var LocalStrategy = require('passport-local').Strategy;
var User = require('../../app/models/user');

var strategy = new LocalStrategy({
    usernameField : 'username',       // default is 'username'
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, username, password, callback) {
    // Find a user with this e-mail
    User.findOne({ 'local.username' : username }, function(err, user) {
      if (err) return callback(err);
      if (user) {
        // A user with this username already exists
        return callback(null, false, req.flash('error', 'This username is already taken.'));
      }
      else {
        // Create a new user
        var newUser            = new User();
        newUser.local.username    = username;
        newUser.local.password = newUser.encrypt(password);
        newUser.category       = req.body.category;
        // newUser.local.email    = email;

        newUser.save(function(err) {
          return callback(err, newUser);
        });
      }
    });
  });

module.exports = strategy;
