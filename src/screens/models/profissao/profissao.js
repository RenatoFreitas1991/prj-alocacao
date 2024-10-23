const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Profissao = sequelize.define('Profissao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  profissao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'tbl_profissao',
  timestamps: false
});

module.exports = Profissao;
