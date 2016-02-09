'use strict';

let User = require('../models/user');
let UserController = require('../controllers/users')(User);

let RestfulRouter = require('express-restful-router');

let router = new RestfulRouter({
  resource: 'user',

  only: [
    'index',
    'show'
  ],

  controller: {
    index: UserController.index,
    show: UserController.show
  }
});

module.exports = router;
