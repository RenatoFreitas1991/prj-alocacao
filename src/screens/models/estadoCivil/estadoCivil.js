const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const EstadoCivil = sequelize.define('EstadoCivil', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estado_civil: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'tbl_estado_civil',
  timestamps: false
});

module.exports = EstadoCivil;
