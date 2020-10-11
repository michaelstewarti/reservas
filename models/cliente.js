/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define(
    'cliente',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      nombre: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'nombre',
      },
      apellido: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'apellido',
      },
      ci: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'ci',
        unique: true,
      },
    },
    {
      cliente: true,
      underscored: true,
      timestamps: true,
      tableName: 'clientes',
    },
  );

  return Cliente;
};
