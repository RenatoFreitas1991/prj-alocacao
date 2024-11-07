const express = require('express');
const router = express.Router();
const { Veiculo, Marca, Cor, Combustivel, TipoVeiculo, Modelo } = require('../../models');
const { QueryTypes } = require('sequelize');
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

  router.get('/disponibilidade/:disponibilidade', async (req, res) => { 
    const disponibilidade = Number(req.params.disponibilidade);

    try {
        const sql = `SELECT v.id, m.modelo, ma.marca, v.placa, v.imagePath 
                        FROM tbl_veiculo v 
                        INNER JOIN tbl_modelo m ON m.id = v.id_modelo 
                        INNER JOIN tbl_marca ma ON ma.id = v.id_marca 
                        WHERE disponibilidade = :disponibilidade`;

        const results = await sequelize.query(sql, {
            replacements: { disponibilidade },
            type: QueryTypes.SELECT,
        });

        console.log(results);
        res.json(results);
    } catch (error) {
        console.error('Erro ao buscar dados dos veículos:', error);
        res.status(500).json({ error: 'Erro ao buscar dados dos veículos' });
    }
});
  
  module.exports = router;
