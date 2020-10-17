'use strict';

const controller = require('./mesas.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/mesas`,
  });

  router
    .get('/:id', controller.getOne)
    .get('/disponibles', controller.getDisponibles)
    .delete('/:id', controller.delete)
    .get('/', controller.getAll)
    .post('/', controller.createOne);

  return router;
};
