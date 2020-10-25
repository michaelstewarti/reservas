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
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'fecha',
      },
      rangos: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
        field: 'rangos',
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
