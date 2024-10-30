const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Endereco = sequelize.define('Endereco', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cidade: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    rua: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    bairro: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    cep: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    numero: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    tableName: 'tbl_endereco',
    timestamps: false
  });

module.exports = Endereco;
