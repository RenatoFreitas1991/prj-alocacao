const express = require('express');
const router = express.Router();
const sequelize = require('../../config/database');
const { QueryTypes } = require('sequelize');


router.post('/favoritate/', async (req, res) => {

    const {
        cpfUser,
        id_veiculo,
    } = req.body;

    try {

        const userResults = await sequelize.query(
            `SELECT id FROM tbl_usuario WHERE cpf = :cpfUser`,
            {
                replacements: { cpfUser },
                type: QueryTypes.SELECT,
            }
        );
    
        if(userResults.length == 0) {
            throw new Error(`Error ao buscar id do usuário para favoritar o veículo.`);
        }
    
        const id = null;
        const id_usuario = userResults[0].id;

        const vehicleFavorite = await sequelize.query(
            `SELECT * FROM tbl_veiculo_favorito 
                WHERE id_veiculo = :id_veiculo AND id_usuario = :id_usuario`,
            {
                replacements: {id_veiculo, id_usuario},
                type: QueryTypes.SELECT,
            }
        );
        if(vehicleFavorite.length == 0) {
            const [favoritateResult] = await sequelize.query(
                `INSERT INTO tbl_veiculo_favorito 
                    (id, 
                    id_veiculo, 
                    id_usuario) 
                    VALUES (:id,
                            :id_veiculo,
                            :id_usuario)`,
                    {
                        replacements: {
                            id,
                            id_veiculo,
                            id_usuario,
                        },
                        type: QueryTypes.INSERT,
                    }
            );
        
            if(favoritateResult.length == 0) {
                throw new Error(`Error ao favoritar veículo.`);
            }
        
            res.status(200).json({ message: 'Veículo favoritado com sucesso' });        
        } else {
            res.status(400).json({ message: 'Este veículo já foi favoritado.' });
        }


    } catch(error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
});

router.get('/:cpfUser', async (req, res) => { 
    const cpf = req.params.cpfUser;

    try {
        const findUserIdByCpf = await sequelize.query(
            `SELECT id FROM tbl_usuario WHERE cpf = :cpf`,
            {
                replacements: { cpf },
                type: QueryTypes.SELECT,
            }
        );

        const id_usuario = findUserIdByCpf[0].id;

        const sql = `SELECT f.id AS favoriteId, v.id, mo.modelo, ma.marca, v.placa, v.imagePath FROM tbl_veiculo_favorito f
        INNER JOIN tbl_veiculo v ON v.id = f.id_veiculo 
        INNER JOIN tbl_modelo mo ON mo.id = v.id_modelo 
        INNER JOIN tbl_marca ma ON ma.id = v.id_marca
        WHERE f.id_usuario = :id_usuario AND v.disponibilidade = 1`;

        const results = await sequelize.query(sql, {
            replacements: { id_usuario },
            type: QueryTypes.SELECT,
        });

        console.log(results);
        res.json(results);

    } catch (error) {
        console.error('Erro ao buscar veículos favoritos do usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar veículos favoritos do usuário' });
    }
});

router.delete('/delete/:favoriteId', async (req, res) => { 
    const favoriteId = Number(req.params.favoriteId);

    try {

        const vehicleFavorite = await sequelize.query(
            `SELECT * FROM tbl_veiculo_favorito WHERE id = :favoriteId`,
            {
                replacements: {favoriteId},
                type: QueryTypes.SELECT,
            }
        );

        if(vehicleFavorite.length != 0) {
            const sql = `DELETE FROM tbl_veiculo_favorito WHERE id = :favoriteId`;

            const results = await sequelize.query(sql, {
                replacements: { favoriteId },
                type: QueryTypes.DELETE,
            });
    
            console.log(results);
            res.json(results);
        }

    } catch (error) {
        console.error('Erro ao desfavoritar veículo:', error);
        res.status(500).json({ error: 'Erro ao desfavoritar veículo' });
    }
});

module.exports = router;