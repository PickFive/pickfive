'use strict';

let authenticate = require('../helpers/authenticate');
let List = require('../models/list');
let ListsController = require('../controllers/lists')(List);

/**
 * @router: an Express Router instance
 * @controller: An instantiated controller
 *
 * The actions inside of the block are customizable
 * and are not limited to the ones defined in the controller
 */
const RestfulRouter = (router, controller) => {
  router.get('/', authenticate, controller.index);
  router.get('/new', authenticate, controller.newForm);
  router.get('/:id', authenticate, controller.show);
  router.post('/', authenticate, controller.create);
  router.get('/:id/edit', authenticate, controller.edit);
  router.put('/:id', authenticate, controller.update);
  router.delete('/:id', authenticate, controller.destroy);
  router.post('/:id', authenticate, controller.createComment);
  return router;
}

module.exports = RestfulRouter(
    require('express').Router(),
    ListsController
);

