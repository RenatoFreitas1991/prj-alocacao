// src/models/usuario.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  },
  cnh: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  nascimento: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  rg: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  orgao_expedidor: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  id_blacklist: {
    type: DataTypes.INTEGER(2),
    defaultValue: 0
  },
  motivo_blacklist: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  id_profissao: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_contato: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_endereco: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_estado_civil: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_avaliacao: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
}, {
  tableName: 'tbl_usuario',
  timestamps: false
});

module.exports = Usuario;
