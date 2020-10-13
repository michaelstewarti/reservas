'use strict';

const { reserva: Reserva } = require('../../models');

exports.getOne = async ctx => {
  const { id } = ctx.params;
  const reserva = await Reserva.findByPk(id);
  ctx.assert(reserva, 404, 'La reserva no existe');
  ctx.status = 200;
  ctx.body = reserva;
};

exports.delete = async ctx => {
  const { id } = ctx.params;
  const reserva = await Reserva.findByPk(id);
  await reserva.destroy();
  ctx.assert(reserva, 404, 'La reserva no existe');
  ctx.status = 200;
  ctx.body = reserva;
};

exports.getAll = async ctx => {
  ctx.status = 200;
  ctx.body = await Reserva.findAll();
};

exports.createOne = async ctx => {
  const { mesaId, clienteId } = ctx.request.body;
  ctx.assert(mesaId, 400, 'Info reserva mal formada');
  ctx.assert(clienteId, 400, 'Info reserva mal formada');
  const reserva = Reserva.create({
    mesaId,
    clienteId,
  });
  ctx.status = 201;
  ctx.body = reserva;
};
