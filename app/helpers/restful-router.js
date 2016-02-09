'use strict';

let express = require('express');
let router = express.Router();

/**
 * @router: Express Router instance
 * @controller: Instantiated controller
 *
 * @TODO add configuration for extempting items
 */
function RestfulRouter (router, controller) {
  this.router = router;
  this.controller = controller;

  this.router.get('/', this.controller.index);

  return this.router;
}

//function RestfulRouter = (router, controller) => {
//  console.log(controller);
//
//  router.get(   '/',         controller.index);
//  router.get(   '/new',      controller.newForm);
//  router.get(   '/:id',      controller.show);
//  router.post(  '/',         controller.create);
//  router.get(   '/:id/edit', controller.edit);
//  router.put(   '/:id',      controller.update);
//  router.delete('/:id',      controller.destroy);
//
//  return router;
//}

module.exports = RestfulRouter.bind(null, router);
