const express = require('express');
const sequelize = require('../../config/database');
const { QueryTypes } = require('sequelize');
const router = express.Router();
const Veiculo = require('../../models/veiculo');

router.get('/vehicles/disponibilidade/:disponibilidade', async (req, res) => { 

    const disponibilidade = Number(req.params.disponibilidade);

    try {
        const sql = `SELECT v.id, m.modelo, ma.marca, v.placa 
                        FROM tbl_veiculo v 
                        INNER JOIN tbl_modelo m ON m.id = v.id_modelo 
                        INNER JOIN tbl_marca ma ON ma.id = v.id_marca 
                        WHERE disponibilidade = :disponibilidade`;

        const sql2 = `SELECT * FROM tbl_veiculo`;

        const results = await sequelize.query(sql, {
            replacements: { disponibilidade },
            type: QueryTypes.SELECT,
        });

        console.log(results)
        res.json(results);
    } catch (error) {
        console.error('Erro ao buscar dados dos veículos:', error);
        res.status(500).json({ error: 'Erro ao buscar dados dos veículos' });
    }
});

module.exports = router;