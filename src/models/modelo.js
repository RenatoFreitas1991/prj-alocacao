const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Modelo = sequelize.define('Modelo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modelo: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'tbl_modelo',
    timestamps: false
})

module.exports = Modelo;