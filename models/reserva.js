/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => {
  const Reserva = sequelize.define(
    'reserva',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
    },
    {
      reserva: true,
      underscored: true,
      timestamps: true,
      tableName: 'reservas',
    },
  );

  Reserva.associate = models => {
    Reserva.belongsTo(models.mesa);
    Reserva.belongsTo(models.cliente);
  };

  return Reserva;
};
