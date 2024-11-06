const express = require('express');
const router = express.Router();
const { Veiculo, Marca, Cor, Combustivel, TipoVeiculo, Modelo } = require('../../models');
const sequelize = require('../../config/database');

// Rota para registrar um novo veículo
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
        imagens
    } = req.body;

    try {
        const result = await sequelize.transaction(async (t) => {
            const tipoVeiculoRecord = await TipoVeiculo.findOne({ where: { tipo_veiculo } }, { transaction: t });
            if (!tipoVeiculoRecord) throw new Error('Tipo Veículo não encontrado');

            const [modeloRecord] = await Modelo.findOrCreate({ where: { modelo }, defaults: { modelo }, transaction: t });
            const [marcaRecord] = await Marca.findOrCreate({ where: { marca }, defaults: { marca }, transaction: t });
            const [corRecord] = await Cor.findOrCreate({ where: { cor }, defaults: { cor }, transaction: t });
            const [combustivelRecord] = await Combustivel.findOrCreate({ where: { combustivel }, defaults: { combustivel }, transaction: t });

            const veiculo = await Veiculo.create({
                id_motorista: 1,
                disponibilidade,
                placa,
                chassi,
                motor,
                ano,
                data_de_entrega: '00/00/000',
                data_de_devolucao: '00/00/000',
                quilometragem,
                id_tipo_veiculo: tipoVeiculoRecord.id,
                id_modelo: modeloRecord.id,
                id_marca: marcaRecord.id,
                id_cor: corRecord.id,
                id_combustivel: combustivelRecord.id,
                imagePath: JSON.stringify(imagens)
            }, { transaction: t });
            return veiculo;
        });

        res.status(201).json({ message: 'Veículo registrado com sucesso', veiculo: result });
    } catch (error) {
        console.error('Erro ao registrar Veículo:', error);
        res.status(500).json({ error: error.message });
    }
});

// Rota para obter detalhes de um veículo específico
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const veiculo = await Veiculo.findOne({
            where: { id },
            include: [
                { model: Marca, as: 'Marca', attributes: ['marca'] },
                { model: Cor, as: 'Cor', attributes: ['cor'] },
                { model: Combustivel, as: 'Combustivel', attributes: ['combustivel'] },
                { model: TipoVeiculo, as: 'TipoVeiculo', attributes: ['tipo_veiculo'] },
                { model: Modelo, as: 'Modelo', attributes: ['modelo'] }
            ]
        });

        if (!veiculo) return res.status(404).json({ error: 'Veículo não encontrado' });

        res.status(200).json(veiculo);
    } catch (error) {
        console.error('Erro ao obter dados do veículo:', error);
        res.status(500).json({ error: 'Erro ao obter dados do veículo' });
    }
});

// Rota pra fazer o EDIT de veículo
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {
        modelo,
        marca,
        cor,
        placa,
        combustivel,
        chassi,
        motor,
        ano,
        quilometragem,
        tipo_veiculo
    } = req.body;

    try {
        // Verifica se o veículo existe
        const veiculoExistente = await Veiculo.findOne({ where: { id } });
        if (!veiculoExistente) {
            console.log(`Veículo com ID ${id} não encontrado`);
            return res.status(404).json({ error: 'Veículo não encontrado para atualização' });
        }

        // Usa findOrCreate para garantir que cada associação exista
        const [tipoVeiculoRecord] = await TipoVeiculo.findOrCreate({ where: { tipo_veiculo } });
        const [modeloRecord] = await Modelo.findOrCreate({ where: { modelo } });
        const [marcaRecord] = await Marca.findOrCreate({ where: { marca } });
        const [corRecord] = await Cor.findOrCreate({ where: { cor } });
        const [combustivelRecord] = await Combustivel.findOrCreate({ where: { combustivel } });

        // Realiza a atualização com os IDs das associações
        const [updatedRows] = await Veiculo.update(
            {
                id_modelo: modeloRecord.id,
                id_marca: marcaRecord.id,
                id_cor: corRecord.id,
                id_combustivel: combustivelRecord.id,
                id_tipo_veiculo: tipoVeiculoRecord.id,
                placa,
                chassi,
                motor,
                ano,
                quilometragem,
            },
            { where: { id } }
        );

        // Verifica se a atualização afetou alguma linha
        if (updatedRows === 0) {
            console.log(`Nenhuma linha atualizada para o veículo com ID ${id}`);
            return res.status(404).json({ error: 'Nenhum veículo foi atualizado' });
        }

        res.status(200).json({ message: 'Veículo atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar veículo:', error);
        res.status(500).json({ error: 'Erro ao atualizar o veículo' });
    }
});


module.exports = router;
