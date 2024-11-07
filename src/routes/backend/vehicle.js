const express = require('express');
const router = express.Router();
const { Veiculo, Marca, Cor, Combustivel, TipoVeiculo, Modelo } = require('../../models');
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
        imagens
    } = req.body;

    try {
        const result = await sequelize.transaction(async (t) => {
            const tipoVeiculoRecord = await TipoVeiculo.findOne({
                where: { tipo_veiculo }
            }, { transaction: t });

            if (!tipoVeiculoRecord) {
                throw new Error('Tipo Veículo não encontrado');
            }

            const [modeloRecord] = await Modelo.findOrCreate({
                where: { modelo },
                defaults: { modelo },
                transaction: t,
            });

            const [marcaRecord] = await Marca.findOrCreate({
                where: { marca },
                defaults: { marca },
                transaction: t,
            });

            const [corRecord] = await Cor.findOrCreate({
                where: { cor },
                defaults: { cor },
                transaction: t,
            });

            const [combustivelRecord] = await Combustivel.findOrCreate({
                where: { combustivel },
                defaults: { combustivel },
                transaction: t,
            });

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

// Rota para atualizar um veículo específico
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
  
      if (!veiculo) {
        return res.status(404).json({ error: 'Veículo não encontrado' });
      }
      res.status(200).json(veiculo);
    } catch (error) {
      console.error('Erro ao obter dados do veículo:', error);
      res.status(500).json({ error: 'Erro ao obter dados do veículo' });
    }
});

router.put('/:id', async (req, res) => {
    console.log("Chegou aqui");
    const id = Number(req.params.id);

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
        tipo_veiculo,
        disponibilidade,
    } = req.body;

    try {
        await sequelize.transaction(async (t) => {
            // Atualizando TipoVeiculo
            const tipoVeiculoRecord = await TipoVeiculo.findOne({ 
                where: { tipo_veiculo },
                transaction: t 
            });

            if (!tipoVeiculoRecord) {
                throw new Error('Tipo Veículo não encontrado');
            }

            const [modeloRecord] = await Modelo.findOrCreate({
                where: { modelo },
                defaults: { modelo },
                transaction: t,
            });

            const [marcaRecord] = await Marca.findOrCreate({
                where: { marca },
                defaults: { marca },
                transaction: t,
            });

            const [corRecord] = await Cor.findOrCreate({
                where: { cor },
                defaults: { cor },
                transaction: t,
            });

            const [combustivelRecord] = await Combustivel.findOrCreate({
                where: { combustivel },
                defaults: { combustivel },
                transaction: t,
            });

            const id_tipo_veiculo = tipoVeiculoRecord.id;
            const id_motorista = 1;
            const id_modelo = modeloRecord.id;
            const id_marca = marcaRecord.id;
            const id_cor = corRecord.id;
            const id_combustivel = combustivelRecord.id;
            const disponibilidade = 1;

            const [result] = await sequelize.query(
                `UPDATE tbl_veiculo 
                 SET id_tipo_veiculo = :id_tipo_veiculo,
                     id_motorista = :id_motorista,
                     id_modelo = :id_modelo,
                     id_marca = :id_marca,
                     id_cor = :id_cor,
                     id_combustivel = :id_combustivel,
                     placa = :placa,
                     chassi = :chassi,
                     motor = :motor,
                     ano = :ano,
                     quilometragem = :quilometragem,
                     disponibilidade = :disponibilidade
                WHERE id = :id`,
                {
                    replacements: {
                        id_tipo_veiculo,
                        id_motorista,
                        id_modelo,
                        id_marca,
                        id_cor,
                        id_combustivel,
                        placa,
                        chassi,
                        motor,
                        ano,
                        quilometragem,
                        disponibilidade,
                        id
                    },
                    transaction: t
                }
            );

            if (result === 0) {
                throw new Error('Veículo não encontrado ou nenhuma alteração feita');
            }
        });

        res.status(200).json({ message: 'Veículo atualizado com sucesso' });

    } catch (error) {
        console.error('Erro ao atualizar Veículo:', error);
        res.status(500).json({ error: error.message });
    }
});

  
module.exports = router;
