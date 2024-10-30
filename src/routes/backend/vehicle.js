const express = require('express');
const router = express.Router();
const { Veiculo, TipoVeiculo, Modelo, Marca, Cor, Combustivel } = require('../../models');
const sequelize = require('../../config/database');
const bcrypt = require('bcrypt');

router.post('/vehicles/', async (req, res) => {
    const {
        tipoVeiculo,
        modelo,
        marca,
        cor,
        combustivel,
        disponibilidade,
        placa,
        chassi,
        motor,
        ano,
        data_de_entrega,
        data_de_devolucao,
        quilometragem,
    } = req.body;

    try {
        const result = await sequelize.transaction(async (t) => {

            const tipoVeiculoRecord = await TipoVeiculo.findOne({
                where: { tipoVeiculo }
            }, { transaction: t });

            if (!tipoVeiculoRecord) {
                throw new Error('Tipo Veículo não encontrado');
            }

            const modeloRecord = await Modelo.findOne({
                where: { modelo }
            }, { transaction: t });

            if(!modeloRecord) {
                throw new Error('Modelo não encontrado')
            }

            const marcaRecord = await Marca.findOne({
                where: { marca }
            }, { transaction: t });

            if(!marcaRecord) {
                throw new Error('Marca não encontrada')
            }

            const corRecord = await Cor.findOne({
                where: { cor }
            }, { transaction: t });

            if(!corRecord) {
                throw new Error('Cor não encontrada')
            }

            const combustivelRecord = await Combustivel.findOne({
                where: { combustivel }
            }, { transaction: t });

            if(!corRecord) {
                throw new Error('Combustível não encontrado')
            }

            const veiculo = await Veiculo.create({
                id_tipo_veiculo: tipoVeiculoRecord.id,
                id_motorista: 1,
                id_modelo: modeloRecord.id,
                id_marca: marcaRecord.id,
                id_cor: corRecord.id,
                id_combustivel: combustivel.id,
                disponibilidade,
                placa,
                chassi,
                motor,
                ano,
                data_de_entrega,
                data_de_devolucao,
                quilometragem,
            }, { transaction: t });
            return veiculo;
        });
    } catch (error) {
        console.error('Erro ao registrar Veículo:', error);
        res.status(500).json({ error: error.message });
    }

});


module.exports = router;