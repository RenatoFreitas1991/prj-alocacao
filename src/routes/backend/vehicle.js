const express = require('express');
const router = express.Router();
const { Veiculo, Marca, Cor, Combustivel, TipoVeiculo, Modelo } = require('../../models');
const sequelize = require('../../config/database');
const { QueryTypes } = require('sequelize');

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
        imagens
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
            const id_modelo = modeloRecord.id;
            const id_marca = marcaRecord.id;
            const id_cor = corRecord.id;
            const id_combustivel = combustivelRecord.id;


            const [result] = await sequelize.query(
                `UPDATE tbl_veiculo 
                 SET id_tipo_veiculo = :id_tipo_veiculo,
                     id_modelo = :id_modelo,
                     id_marca = :id_marca,
                     id_cor = :id_cor,
                     id_combustivel = :id_combustivel,
                     placa = :placa,
                     chassi = :chassi,
                     motor = :motor,
                     ano = :ano,
                     quilometragem = :quilometragem,
                     imagePath = :imagePath
                WHERE id = :id`,
                {
                    replacements: {
                        id_tipo_veiculo,
                        id_modelo,
                        id_marca,
                        id_cor,
                        id_combustivel,
                        placa,
                        chassi,
                        motor,
                        ano,
                        quilometragem,
                        imagePath: JSON.stringify(imagens),
                        id
                    },
                    transaction: t
                }
            );

            if (result === 0) {
                throw new Error('Erro ao atualizar Veículo');
            }
        });

        res.status(200).json({ message: 'Veículo atualizado com sucesso' });

    } catch (error) {
        console.error('Erro ao atualizar Veículo:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/info/:id', async (req, res) => {
    const id = Number(req.params.id);

    if(isNaN(id)) {
        return res.status(400).json({ error: 'Id inválido' });
    }

    try {
        const sql = `SELECT v.id, m.modelo, ma.marca, cor.cor, v.placa, com.combustivel, v.chassi, v.motor, v.ano, v.quilometragem, v.data_de_entrega, v.data_de_devolucao, tipo.tipo_veiculo
                        FROM tbl_veiculo v
                        INNER JOIN tbl_modelo m ON m.id = v.id_modelo
                        INNER JOIN tbl_marca ma ON ma.id = v.id_marca
                        INNER JOIN tbl_cor cor ON cor.id = v.id_cor
                        INNER JOIN tbl_combustivel com ON com.id = v.id_combustivel
                        INNER JOIN tbl_tipo_veiculo tipo ON tipo.id = v.id_tipo_veiculo
                        WHERE v.id = :id LIMIT 1`;

        const result = await sequelize.query(sql, {
            replacements: { id },
            type: QueryTypes.SELECT,
        });

        console.log(result);
        res.status(200).json(result);

    } catch (error) {
      console.error('Erro ao obter dados do veículo:', error);
      res.status(500).json({ error: 'Erro ao obter dados do veículo' });
    }
});


router.get('/info/user/:id', async (req, res) => {
    const id = Number(req.params.id);

    if(isNaN(id)) {
        return res.status(400).json({ error: 'Id inválido' });
    }

    try {
        const sql = `SELECT u.id, u.nome, u.cpf, u.cnh, c.telefone, l.data_de_entrega, l.data_de_devolucao, l.valor FROM tbl_locacao_veiculo l
                        INNER JOIN tbl_usuario u ON l.id_usuario = u.id
                        INNER JOIN tbl_veiculo v ON l.id_veiculo = v.id
                        INNER JOIN tbl_contato c ON u.id_contato = c.id
                        WHERE l.id_veiculo = :id AND v.disponibilidade != 1 AND l.id_locacao_status = 2;`;

        const result = await sequelize.query(sql, {
            replacements: { id },
            type: QueryTypes.SELECT,
        });

        console.log(result);
        res.status(200).json(result);

    } catch (error) {
      console.error('Erro ao obter dados relacionados ao nome do usuário:', error);
      res.status(500).json({ error: 'Erro ao obter relacionados ao nome do usuário' });
    }
});

router.get('/plate/:plate', async (req, res) => {
    const plate = req.params.plate;

    try {
        const findVehicleByPlate = await sequelize.query(
            `SELECT id, placa FROM tbl_veiculo WHERE placa = :plate;`,
            {
                replacements: { plate },
                type: QueryTypes.SELECT,
            }
        );
        console.log(findVehicleByPlate);
        res.json(findBlackListInfoUserByCpf);
    } catch(error) {
        console.error(`Error ao buscar dados do veículo a partir da placa: ${plate} `, error);
        res.status(500).json({ erro: 'Error ao buscar dados do veículo a partir da placa' })
    }
}); 

module.exports = router;
