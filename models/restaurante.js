/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => {
  const Restaurante = sequelize.define('restaurante', {
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
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'descripcion',
    },
  });

  Restaurante.associate = models => {
    Restaurante.hasMany(models.mesa);
  };

  return Restaurante;
};
