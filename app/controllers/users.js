var express = require('express');
var router = express.Router();

// users model
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find()
    .then((users) => {
      res.json(users);
      next();
    });
});

module.exports = router;
