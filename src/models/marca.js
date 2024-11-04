const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Marca = sequelize.define('Marca', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_tipo_veiculo: {
    type: DataTypes.INTEGER,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'tbl_marca',
  timestamps: false,
});

module.exports = Marca;