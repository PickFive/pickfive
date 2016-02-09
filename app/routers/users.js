'use strict';

// Require our users model
let User = require('../models/user');

// require our base controller and inject the user model
let UsersController = require('../controllers/base')(User);

// create a new RestfulRouter based on the controller
let RestfulRouter = require('../helpers/restful-router');

// export it to be used in the application
module.exports = RestfulRouter(UsersController);
