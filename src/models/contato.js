const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contato = sequelize.define('Contato', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING(15),
    allowNull: false
  }
}, {
  tableName: 'tbl_contato',
  timestamps: false
});

module.exports = Contato;
