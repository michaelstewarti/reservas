'use strict';

const {
  reserva: Reserva,
  cliente: Cliente,
  mesa: Mesa,
} = require('../../models');

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
  const { clienteId, fecha, restauranteId } = ctx.query;

  const options = {
    include: {
      model: Mesa,
    },
    where: {},
    order: [['mesaId', 'ASC'], ['rangos', 'ASC']],
  };
  if (clienteId) {
    options.where.clienteId = clienteId;
  }
  if (restauranteId) {
    options.where['$mesa.restaurante_id$'] = restauranteId;
  }
  if (fecha) {
    options.where.fecha = new Date(fecha.replace(/T00/gi, 'T12'));
  }

  ctx.status = 200;
  ctx.body = await Reserva.findAll(options);
};

exports.createOne = async ctx => {
  const { mesaId, ci, fecha, rangos } = ctx.request.body;

  ctx.assert(mesaId, 400, 'mesaId requerido');
  ctx.assert(ci, 400, 'ci requerido');
  ctx.assert(fecha, 400, 'fecha requerido');
  ctx.assert(rangos, 400, 'rangos requerido');

  const cliente = await Cliente.findOne({
    where: {
      ci,
    },
  });
  ctx.assert(cliente, 400, 'not_registered');
  const reserva = await Reserva.create({
    fecha: new Date(fecha.replace(/T00/gi, 'T12')),
    mesaId,
    clienteId: cliente.id,
    rangos: (typeof rangos === 'object' && rangos) || [rangos],
  });
  ctx.status = 201;
  ctx.body = reserva;
};
