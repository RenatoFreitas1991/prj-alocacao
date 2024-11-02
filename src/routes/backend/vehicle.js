const express = require('express');
const router = express.Router();
const { Veiculo, TipoVeiculo, Modelo, Marca, Cor, Combustivel } = require('../../models');
const sequelize = require('../../config/database');

router.post('/register/vehicles/', async (req, res) => {
    const {
        tipo_veiculo,
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
            cor.toLowerCase();

            const tipoVeiculoRecord = await TipoVeiculo.findOne({
                where: { tipo_veiculo }
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

            const dataPadrao = '00/00/000';

            const veiculo = await Veiculo.create({
                id_motorista: 1,
                disponibilidade,
                placa,
                chassi,
                motor,
                ano,
                data_de_entrega: dataPadrao,
                data_de_devolucao: dataPadrao,
                quilometragem,
                id_tipo_veiculo: tipoVeiculoRecord.id,
                id_modelo: modeloRecord.id,
                id_marca: marcaRecord.id,
                id_cor: corRecord.id,
                id_combustivel: combustivelRecord.id,
            }, { transaction: t });
            return veiculo;
        });

        res.status(201).json({ message: 'Veículo registrado com sucesso', veiculo: result });

    } catch (error) {
        console.error('Erro ao registrar Veículo:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;