const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Avaliacao = sequelize.define('Avaliacao', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  avaliacao: {
    type: DataTypes.INTEGER(5),
    allowNull: false,
    defaultValue: 0 
  },
  motivo: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'tbl_avaliacao',
  timestamps: false
});

module.exports = Avaliacao;
