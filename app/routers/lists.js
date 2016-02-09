'use strict';

let List = require('../models/list');

let ListsController = require('../controllers/base')(List);

let RestfulRouter = require('../helpers/restful-router');

module.exports = new RestfulRouter(ListsController);
