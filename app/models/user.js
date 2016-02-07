var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// require any nested documents as well

var UserSchema = mongoose.Schema({
  local: {
    email: {type: String, required: true},
    password: {type: String, required: true}
  }
});

UserSchema.methods.encrypt = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

UserSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', UserSchema);
