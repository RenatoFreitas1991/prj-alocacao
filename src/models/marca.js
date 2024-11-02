const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Marca = sequelize.define('Marca', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    marca: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'tbl_marca',
    timestamps: false
})

module.exports = Marca;