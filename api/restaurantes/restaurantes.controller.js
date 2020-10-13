'use strict';

const { restaurante: Restaurante } = require('../../models');

exports.getOne = async ctx => {
  const { id } = ctx.params;
  const restaurante = await Restaurante.findByPk(id);
  ctx.assert(restaurante, 404, 'El restaurante no existe');
  ctx.status = 200;
  ctx.body = restaurante;
};

exports.delete = async ctx => {
  const { id } = ctx.params;
  const restaurante = await Restaurante.findByPk(id);
  await restaurante.destroy();
  ctx.assert(restaurante, 404, 'El restaurante no existe');
  ctx.status = 200;
  ctx.body = restaurante;
};

exports.getAll = async ctx => {
  ctx.status = 200;
  ctx.body = await Restaurante.findAll();
};

exports.createOne = async ctx => {
  const { nombre, descripcion } = ctx.request.body;
  ctx.assert(nombre, 400, 'Info restaurante mal formada');
  const restaurante = Restaurante.create({
    nombre,
    descripcion,
  });
  ctx.status = 201;
  ctx.body = restaurante;
};
