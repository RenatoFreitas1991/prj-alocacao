const express = require('express');
const sequelize = require('../../config/database');
const { QueryTypes } = require('sequelize');
const router = express.Router();

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

router.get('/notAvailable', async (req, res) => { 

    try {
        const sql = `SELECT v.id, m.modelo, ma.marca, v.placa, l.imagePath 
                        FROM tbl_veiculo v 
                        INNER JOIN tbl_modelo m ON m.id = v.id_modelo 
                        INNER JOIN tbl_marca ma ON ma.id = v.id_marca 
                        INNER JOIN tbl_locacao_veiculo l ON l.id_veiculo = v.id 
                        WHERE v.disponibilidade = 0 AND l.id_locacao_status = 2`;

        const results = await sequelize.query(sql, {
            type: QueryTypes.SELECT,
        });

        console.log(results);
        res.json(results);
        
    } catch (error) {
        console.error('Erro ao buscar dados dos veículos:', error);
        res.status(500).json({ error: 'Erro ao buscar dados dos veículos' });
    }
});

router.get('/rentalVehicleHistory', async (req, res) => {
    try {

        const sql = `SELECT l.id, u.nome, l.data_de_entrega, l.data_de_devolucao, v.imagePath, v.placa 
                        FROM tbl_locacao_veiculo l
                        JOIN tbl_usuario u ON l.id_usuario = u.id 
                        JOIN tbl_veiculo v ON l.id_veiculo = v.id 
                        WHERE l.id_locacao_status = 1 AND l.id_pagamento = 2`;
        
        const results = await sequelize.query(sql, {
            type: QueryTypes.SELECT,
        })

        console.log(results);
        res.json(results);

    } catch(error) {
        console.log('Error ao busgar histórico de veículos não alugados', error);
        res.status(500).json({ error: 'Error ao busgar histórico de veículos não alugados' })
    }
});

module.exports = router;
