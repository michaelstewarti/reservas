'use strict';

const controller = require('./clientes.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/clientes`,
  });

  router
    .get('/:id', controller.getOne)
    .delete('/:id', controller.delete)
    .get('/', controller.getAll)
    .post('/', controller.createOne);

  return router;
};
