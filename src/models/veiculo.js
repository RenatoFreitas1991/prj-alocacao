const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Veiculo = sequelize.define('Veiculo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  disponibilidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  placa: {
    type: DataTypes.STRING,
    defaultValue: 0
  },

  chassi: {
    type: DataTypes.STRING,
    allowNull: false
  },

  motor: {
    type: DataTypes.STRING,
    allowNull: false
  },

  ano: {
    type: DataTypes.STRING,
    allowNull: false
  },

  data_de_entrega: {
    type: DataTypes.STRING,
    allowNull: false
  },

  data_de_devolucao: {
    type: DataTypes.STRING,
    allowNull: false
  },

  quilometragem: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'tbl_veiculo',
  timestamps: false
});

module.exports = Veiculo;
