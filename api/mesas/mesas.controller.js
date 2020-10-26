'use strict';

const {
  mesa: Mesa,
  reserva: Reserva,
  Sequelize: {
    Op: { overlap, notIn },
  },
} = require('../../models');

exports.getOne = async ctx => {
  const { id } = ctx.params;
  const mesa = await Mesa.findByPk(id);
  ctx.assert(mesa, 404, 'La mesa no existe');
  ctx.status = 200;
  ctx.body = mesa;
};

exports.getDisponibles = async ctx => {
  const { rangos, fecha, restauranteId } = ctx.query;

  ctx.assert(fecha, 400, 'Fecha no definida');
  ctx.assert(restauranteId, 400, 'Restaurante no definido');
  ctx.assert(rangos, 400, 'Rangos no definidos');

  ctx.status = 200;

  let rangosConsulta = [];

  if (typeof rangos === 'object') {
    rangosConsulta = rangos;
  } else if (rangos.includes('[')) {
    rangosConsulta = rangos
      .replace(']', '')
      .replace('[', '')
      .replace("'", '')
      .replace(', ', ',')
      .split(',');
  } else {
    rangosConsulta = [rangos];
  }

  const idsMesasReservadas = await Reserva.findAll({
    attributes: ['mesaId'],
    where: {
      fecha: new Date(fecha.replace(/T00/gi, 'T12')),
      rangos: {
        [overlap]: rangosConsulta,
      },
    },
  }).then(results => {
    if (results.length) {
      return results.map(result => result.mesaId);
    }
    return results;
  });

  ctx.body = await Mesa.findAll({
    where: {
      restauranteId,
      id: {
        [notIn]: idsMesasReservadas,
      },
    },
  });
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
