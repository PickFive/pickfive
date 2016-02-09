'use strict';

let authenticate = require('../helpers/authenticate');
let User = require('../models/user');
let UsersController = require('../controllers/users')(User);

const RestfulRouter = (router, controller) => {
  router.get('/', authenticate, controller.index);
  router.get('/new', authenticate, controller.newForm);
  router.get('/:id', authenticate, controller.show);
  router.post('/', authenticate, controller.create);
  router.get('/:id/edit', authenticate, controller.edit);
  router.put('/:id', authenticate, controller.update);
  router.delete('/:id', authenticate, controller.destroy);

  return router;
}

module.exports = RestfulRouter(
    require('express').Router(),
    UsersController
);
