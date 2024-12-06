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

    } catch(error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
});

module.exports = router;