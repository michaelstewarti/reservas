'use strict';

const controller = require('./reservas.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/reservas`,
  });

  router
    .get('/:id', controller.getOne)
    .delete('/:id', controller.delete)
    .get('/', controller.getAll)
    .post('/', controller.createOne);

  return router;
};
