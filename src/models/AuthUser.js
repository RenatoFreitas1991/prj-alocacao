const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AuthUser = sequelize.define('AuthUser', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'cpf'
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'senha'
  }
}, {
  tableName: 'tbl_usuario',
  timestamps: false
});

module.exports = AuthUser;
