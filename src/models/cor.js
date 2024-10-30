const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cor = sequelize.define('Cor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cor: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'tbl_cor',
    timestamps: false
})

module.exports = Cor;