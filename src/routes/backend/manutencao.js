// const router = express.Router();
// const sequelize = require('../../config/database');
// const { QueryTypes } = require('sequelize');

const express = require('express');
const router = express.Router();
const sequelize = require('../../config/database');
const { QueryTypes } = require('sequelize');


router.post('/register/', async (req, res) => {
    const {
        placa,
        dataManutencao,
        descricao,
    } = req.body;

    try {

        const vehicleResults = await sequelize.query(
            "SELECT id FROM tbl_veiculo WHERE placa = :placa",
            {
                replacements: { placa },
                type: QueryTypes.SELECT,
            }
        );
    
        if(vehicleResults.length == 0) {
            throw new Error(`Error Manutenção: Veículo não encontrado com a placa: ${placa}`);
        }
    
        const id = null;
        const id_veiculo = vehicleResults[0].id;

        const [result] = await sequelize.query(
            `INSERT INTO tbl_manutencao 
                (id, 
                id_veiculo, 
                data_manutencao, 
                descricao) 
                VALUES (:id,
                        :id_veiculo,
                        :dataManutencao,
                        :descricao)`,
            {
                replacements: {
                    id,
                    id_veiculo,
                    dataManutencao,
                    descricao,
                },
                type: QueryTypes.INSERT,
            }
        );

        if(result == 0) {
            throw new Error("Error ao cadastrar Manutenção")
        }

        res.status(200).json({ mesage: 'Manutenção cadastrada com sucesso' });

    }  catch(error) {
        console.log('Error ao cadastrar Manutenção');
        res.status(500).json({ error: error.message });
    }

})

router.get('/vehicle/:id_veiculo', async (req, res) => {
    const id_veiculo = Number(req.params.id_veiculo);

    if(isNaN(id_veiculo)) {
        return res.status(400).json({ error: 'Id inválido' });
    }

    try {
        const sql = `SELECT m.id, m.data_manutencao, m.descricao 
                        FROM tbl_manutencao m 
                        WHERE m.id_veiculo = :id_veiculo
                        ORDER BY m.data_manutencao;`;

        const result = await sequelize.query(sql, {
            replacements: { id_veiculo },
            type: QueryTypes.SELECT,
        });

        console.log(result);
        res.status(200).json(result);

    } catch (error) {
      console.error('Erro ao obter dados de manutenções do veículo:', error);
      res.status(500).json({ error: 'Erro ao obter dados de manutenções do veículo' });
    }
});

module.exports = router;