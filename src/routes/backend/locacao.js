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

        res.status(200).json({ message: 'Locação cadastrada com sucesso' });

    } catch (error) {
        console.error('Erro ao cadastrar Locação:', error);
        res.status(500).json({ error: error.message });
    }

});

router.get('/:id_veiculo', async (req, res) => {
    const id_veiculo = Number(req.params.id_veiculo);

    try {
        const sql = `SELECT v.placa, l.quilometragem, u.cpf, u.nome, l.data_de_entrega, l.data_de_devolucao 
                        FROM tbl_locacao_veiculo l 
                        INNER JOIN tbl_usuario u ON u.id = l.id_usuario 
                        INNER JOIN tbl_veiculo v ON v.id = l.id_veiculo 
                        WHERE v.id = :id_veiculo AND v.disponibilidade = 0;`;

        const result = await sequelize.query(sql, {
            replacements: { id_veiculo },
            type: QueryTypes.SELECT,
        })

        console.log(result);
        res.json(result);
    } catch(error) {
        console.error('Erro ao buscar dados da locação:', error);
        res.status(500).json({ erro: 'Erro ao buscar dados da locação' })
    }
});

router.put('/update/', async (req, res) => {
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

        const locacaoResults = await sequelize.query(
            `SELECT l.id FROM tbl_locacao_veiculo l 
                INNER JOIN tbl_veiculo v ON v.id = l.id_veiculo 
                WHERE v.id = :id_veiculo AND v.disponibilidade = 0`,
            {
                replacements: { id_veiculo },
                type: QueryTypes.SELECT,
            }
        );

        const id = locacaoResults[0].id;
    
        const [resultInsert] = await sequelize.query(
            `UPDATE tbl_locacao_veiculo SET
                id_veiculo = :id_veiculo, 
                id_usuario = :id_usuario, 
                quilometragem = :quilometragemInt, 
                data_de_entrega = :dataEntrega, 
                data_de_devolucao = :dataDevolucao, 
                imagePath = :imagePath 
                WHERE id = :id`,
                {
                    replacements: {
                        id_veiculo,
                        id_usuario,
                        quilometragemInt,
                        dataEntrega,
                        dataDevolucao,
                        imagePath,
                        id,
                    },
                    type: QueryTypes.UPDATE,
                }
        );
    
        if (resultInsert === 0) {
            throw new Error('Error ao atualizar Locação');
        }

        res.status(200).json({ message: 'Locação atualizada com sucesso' });

    } catch (error) {
        console.error('Erro ao atualizar Locação:', error);
        res.status(500).json({ error: error.message });
    }

});

module.exports = router;