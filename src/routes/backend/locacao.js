const express = require('express');
const router = express.Router();
const sequelize = require('../../config/database');
const { QueryTypes } = require('sequelize');

router.post('/register/', async (req, res) => {
    const {
        imagePath,
        placa,
        quilometragem,
        cpfUsuario,
        nomeUsuario,
        dataEntrega,
        dataDevolucao
    } = req.body;

    try {
        const userResults = await sequelize.query(
            "SELECT id FROM tbl_usuario WHERE cpf = :cpfUsuario",
            {
                replacements: { cpfUsuario },
                type: QueryTypes.SELECT,
            }
        );
    
        if(userResults.length == 0) {
            throw new Error(`Error Locação: Usuário não encontrado com o cpf: ${cpfUsuario}.`);
        }
    
        const vehicleResults = await sequelize.query(
            "SELECT id FROM tbl_veiculo WHERE placa = :placa",
            {
                replacements: { placa },
                type: QueryTypes.SELECT,
            }
        );
    
        if(vehicleResults.length == 0) {
            throw new Error(`Error Locação: Veículo não encontrado com a placa: ${placa}.`);
        }
    
        const id_usuario = userResults[0].id;
        const id_veiculo = vehicleResults[0].id;
        const quilometragemInt = Number(quilometragem);
        const disponibilidade = 0;

        const id = null;
    
        const [resultInsert] = await sequelize.query(
            `INSERT INTO tbl_locacao_veiculo 
                (id,
                id_veiculo, 
                id_usuario, 
                quilometragem, 
                data_de_entrega, 
                data_de_devolucao, 
                imagePath) 
                VALUES (:id,
                        :id_veiculo, 
                        :id_usuario, 
                        :quilometragemInt,
                        :dataEntrega, 
                        :dataDevolucao, 
                        :imagePath)`,
                {
                    replacements: {
                        id,
                        id_veiculo,
                        id_usuario,
                        quilometragemInt,
                        dataEntrega,
                        dataDevolucao,
                        imagePath,
                    },
                    type: QueryTypes.INSERT,
                }
        );
    
        if (resultInsert === 0) {
            throw new Error('Error ao cadastrar Locação');
        }

        const [resultUpdate] = await sequelize.query(
            `UPDATE tbl_veiculo 
                SET  disponibilidade = :disponibilidade
                WHERE id = :id_veiculo`,
            {
                replacements: {
                    disponibilidade,
                    id_veiculo
                },
                type: QueryTypes.UPDATE,
            }
        );

        if (resultUpdate === 0) {
            throw new Error('Error ao atualizar a disponibilidade do Veículo');
        }

        // const [vehicleUserUpdate] = await sequelize.query(
        //     `UPDATE tbl_veiculo 
        //         SET  id_motorista = :id_usuario
        //         WHERE id = :id_veiculo`,
        //     {
        //         replacements: {
        //             id_usuario,
        //             id_veiculo
        //         },
        //         type: QueryTypes.UPDATE,
        //     }
        // );

        // if (vehicleUserUpdate === 0) {
        //     throw new Error('Error ao atualizar a disponibilidade do Veículo');
        // }

        res.status(200).json({ message: 'Locação cadastrada com sucesso' });

    } catch (error) {
        console.error('Erro ao cadastrar Locação:', error);
        res.status(500).json({ error: error.message });
    }

});

module.exports = router;