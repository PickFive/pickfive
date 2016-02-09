'use strict';

let User = require('../models/user');

/**
 * @router: Express Router instance
 * @controller: Instantiated controller
 */
const RestfulRouter = (router, controller) => {
  router.get(   '/',         controller.index);
  router.get(   '/new',      controller.newForm);
  router.get(   '/:id',      controller.show);
  router.post(  '/',         controller.create);
  router.get(   '/:id/edit', controller.edit);
  router.put(   '/:id',      controller.update);
  router.delete('/:id',      controller.destroy);

  return router;
}

module.exports = RestfulRouter(
    require('express').Router(),
    require('../controllers/users')(User)
);
