'use strict';

const { cliente: Cliente } = require('../../models');

exports.getOne = async ctx => {
  const { id } = ctx.params;
  const cliente = await Cliente.findByPk(id);
  ctx.assert(cliente, 404, 'El cliente no existe');
  ctx.status = 200;
  ctx.body = cliente;
};

exports.delete = async ctx => {
  const { id } = ctx.params;
  const cliente = await Cliente.findByPk(id);
  await cliente.destroy();
  ctx.assert(cliente, 404, 'El cliente no existe');
  ctx.status = 200;
  ctx.body = cliente;
};

exports.getAll = async ctx => {
  ctx.status = 200;
  ctx.body = await Cliente.findAll();
};

exports.createOne = async ctx => {
  const { nombre, apellido, ci } = ctx.request.body;
  ctx.assert(nombre, 400, 'Info cliente mal formada');
  const cliente = Cliente.create({
    nombre,
    apellido,
    ci,
  });
  ctx.status = 201;
  ctx.body = cliente;
};
