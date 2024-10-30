const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoVeiculo = sequelize.define('TipoVeiculo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_veiculo: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'tbl_tipo_veiculo',
    timestamps: false
})

module.exports = TipoVeiculo;