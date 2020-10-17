'use strict';

const { mesa: Mesa } = require('../../models');

exports.getOne = async ctx => {
  const { id } = ctx.params;
  const mesa = await Mesa.findByPk(id);
  ctx.assert(mesa, 404, 'La mesa no existe');
  ctx.status = 200;
  ctx.body = mesa;
};

exports.getDisponibles = async ctx => {
  // TODO
  ctx.status = 200;
  ctx.body = await Mesa.findAll();
};

exports.delete = async ctx => {
  const { id } = ctx.params;
  const mesa = await Mesa.findByPk(id);
  await mesa.destroy();
  ctx.assert(mesa, 404, 'La mesa no existe');
  ctx.status = 200;
  ctx.body = mesa;
};

exports.getAll = async ctx => {
  ctx.status = 200;
  ctx.body = await Mesa.findAll();
};

exports.createOne = async ctx => {
  const { nombre, x, y, planta, capacidad, restauranteId } = ctx.request.body;
  ctx.assert(nombre, 400, 'Info mesa mal formada');
  const mesa = Mesa.create({
    nombre,
    x,
    y,
    planta,
    capacidad,
    restauranteId,
  });
  ctx.status = 201;
  ctx.body = mesa;
};
