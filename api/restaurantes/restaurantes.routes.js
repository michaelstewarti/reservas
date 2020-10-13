'use strict';

const controller = require('./restaurantes.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/restaurantes`,
  });

  router
    .get('/:id', controller.getOne)
    .delete('/:id', controller.delete)
    .get('/', controller.getAll)
    .post('/', controller.createOne);

  return router;
};
