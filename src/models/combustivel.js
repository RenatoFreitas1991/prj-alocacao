const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Combustivel = sequelize.define('Combustivel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    combustivel: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'tbl_combustivel',
    timestamps: false
})

module.exports = Combustivel;