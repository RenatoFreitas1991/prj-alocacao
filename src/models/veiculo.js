const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Veiculo = sequelize.define('Veiculo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  id_tipo_veiculo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  id_motorista: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },

  id_modelo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  id_marca: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  id_cor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  id_combustivel: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  }
}, {
  tableName: 'tbl_veiculo',
  timestamps: false
});

module.exports = Veiculo;
