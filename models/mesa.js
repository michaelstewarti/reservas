/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => {
  const Mesa = sequelize.define(
    'mesa',
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
      x: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'x',
      },
      y: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'y',
      },
      planta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'planta',
        defaultValue: 1,
      },
      capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'capacidad',
      },
    },
    {
      mesa: true,
      underscored: true,
      timestamps: true,
      tableName: 'mesas',
    },
  );

  Mesa.associate = models => {
    Mesa.belongsTo(models.restaurante, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Mesa;
};
