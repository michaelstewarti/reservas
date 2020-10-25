'use strict';

const controller = require('./mesas.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/mesas`,
  });

  router
    .get('/disponibles', controller.getDisponibles)
    .get('/:id', controller.getOne)
    .delete('/:id', controller.delete)
    .get('/', controller.getAll)
    .post('/', controller.createOne);

  return router;
};
