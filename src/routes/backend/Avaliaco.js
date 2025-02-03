const express = require('express');
const router = express.Router();
const sequelize = require('../../config/database');
const { QueryTypes } = require('sequelize');

router.post('/', async (req, res) => {
    const {
        cpfUser,
        avaliacao,
        motivo,
    } = req.body;

    try {
        const userResults = await sequelize.query(
            "SELECT id FROM tbl_usuario WHERE cpf = :cpfUser",
            {
                replacements: { cpfUser },
                type: QueryTypes.SELECT,
            }
        );
    
        if(userResults.length == 0) {
            throw new Error(`Error Avaliação: Usuário não encontrado com o cpf: ${cpfUser}.`);
        }
    
        const id = null;
        const id_usuario = userResults[0].id;
    
        const [resultInsert] = await sequelize.query(
            `INSERT INTO tbl_avaliacao
                (id, 
                id_usuario, 
                avaliacao, 
                motivo) 
                VALUES (:id, 
                        :id_usuario, 
                        :avaliacao, 
                        :motivo)`,
                {
                    replacements: {
                        id,
                        id_usuario,
                        avaliacao,
                        motivo
                    },
                    type: QueryTypes.INSERT,
                }
        );
    
        if (resultInsert === 0) {
            throw new Error('Error ao cadastrar Avaliação');
        }

        res.status(200).json({ message: 'Avaliação cadastrada com sucesso' });

    } catch (error) {
        console.error('Erro ao cadastrar Locação:', error);
        res.status(500).json({ error: error.message });
    }

});

module.exports = router;