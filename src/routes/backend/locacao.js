const express = require('express');
const router = express.Router();
const sequelize = require('../../config/database');
const { QueryTypes } = require('sequelize');

router.post('/register/', async (req, res) => {
    const {
        placa,
        quilometragem,
        cpfUsuario,
        dataEntrega,
        dataDevolucao,
        imagens,
        valorLocacao
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
        const id_locacao_status = 2;
        const id_pagamento = 1;

        const id = null;

        const urlFindLocacao = await sequelize.query(
            `SELECT l.id, l.id_veiculo, l.id_usuario 
            FROM tbl_locacao_veiculo l 
            INNER JOIN tbl_veiculo v ON v.id = l.id_veiculo 
            INNER JOIN tbl_usuario u ON u.id = l.id_usuario 
            WHERE l.id_locacao_status = 2 AND l.id_pagamento = 1 AND v.id = :id_veiculo AND u.id = :id_usuario`,
            {
                replacements: { id_veiculo, id_usuario },
                type: QueryTypes.SELECT
            }
        );

        if(urlFindLocacao.length == 0) {
            const [resultInsert] = await sequelize.query(
                `INSERT INTO tbl_locacao_veiculo 
                    (id,
                    id_veiculo, 
                    id_usuario, 
                    quilometragem, 
                    data_de_entrega, 
                    data_de_devolucao, 
                    imagePath,
                    id_locacao_status,
                    id_pagamento,
                    valor) 
                    VALUES (:id,
                            :id_veiculo, 
                            :id_usuario, 
                            :quilometragemInt,
                            :dataEntrega, 
                            :dataDevolucao, 
                            :imagePath,
                            :id_locacao_status,
                            :id_pagamento,
                            :valorLocacao)`,
                    {
                        replacements: {
                            id,
                            id_veiculo,
                            id_usuario,
                            quilometragemInt,
                            dataEntrega,
                            dataDevolucao,
                            imagePath: JSON.stringify(imagens),
                            id_locacao_status,
                            id_pagamento,
                            valorLocacao,
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
                        id_veiculo,
                    },
                    type: QueryTypes.UPDATE,
                }
            );
    
            if (resultUpdate === 0) {
                throw new Error('Error ao atualizar a disponibilidade do Veículo');
            }
    
            res.status(200).json({ message: 'Locação cadastrada com sucesso' });
        } else {
            res.status(500).json({ message: 'Locação não pode ser realizada, pois este veículo já está alugado por alguém' });
        }


    } catch (error) {
        console.error('Erro ao cadastrar Locação:', error);
        res.status(500).json({ error: error.message });
    }

});

router.get('/:id_veiculo', async (req, res) => {
    const id_veiculo = Number(req.params.id_veiculo);

    try {
        const sql = `SELECT l.id AS id_locacao, v.placa, l.quilometragem, u.cpf, u.nome, l.data_de_entrega, l.data_de_devolucao, l.valor 
                        FROM tbl_locacao_veiculo l 
                        INNER JOIN tbl_usuario u ON u.id = l.id_usuario 
                        INNER JOIN tbl_veiculo v ON v.id = l.id_veiculo 
                        WHERE v.id = :id_veiculo AND v.disponibilidade = 0 AND l.id_locacao_status = 2;`;

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

router.get('/vehicles/user/:cpf', async (req, res) => {
    const cpf = req.params.cpf;

    try {
        const findUserIdByCpf = await sequelize.query(
            `SELECT id FROM tbl_usuario WHERE cpf = :cpf`,
            {
                replacements: { cpf },
                type: QueryTypes.SELECT,
            }
        );

        const id_usuario = findUserIdByCpf[0].id;

        const sql = `SELECT l.id, v.id AS idVehicle, m.modelo, ma.marca, v.placa, v.imagePath, l.data_de_devolucao, l.id_pagamento 
                        FROM tbl_locacao_veiculo l
                        INNER JOIN tbl_veiculo v ON l.id_veiculo = v.id
                        INNER JOIN tbl_modelo m ON m.id = v.id_modelo 
                        INNER JOIN tbl_marca ma ON ma.id = v.id_marca 
                        WHERE l.id_usuario = :id_usuario AND l.id_locacao_status = 2`;

        const result = await sequelize.query(sql, {
            replacements: { id_usuario },
            type: QueryTypes.SELECT,
        })

        console.log(result);
        res.json(result);
    } catch(error) {
        console.error('Erro ao buscar dados da locação do usuário:', error);
        res.status(500).json({ erro: 'Erro ao buscar dados da locação do usuário' })
    }
});

router.get('/vehicles/historic/user/:cpf', async (req, res) => {
    const cpf = req.params.cpf;

    try {
        const findUserIdByCpf = await sequelize.query(
            `SELECT id FROM tbl_usuario WHERE cpf = :cpf`,
            {
                replacements: { cpf },
                type: QueryTypes.SELECT,
            }
        );

        const id_usuario = findUserIdByCpf[0].id;

        const sql = `SELECT l.id AS idLocacao, v.id AS idVehicle, m.modelo, ma.marca, v.placa, v.imagePath, l.data_de_devolucao, l.id_pagamento 
                    FROM tbl_locacao_veiculo l
                    INNER JOIN tbl_veiculo v ON l.id_veiculo = v.id
                    INNER JOIN tbl_modelo m ON m.id = v.id_modelo 
                    INNER JOIN tbl_marca ma ON ma.id = v.id_marca 
                    WHERE l.id_usuario = :id_usuario AND l.id_locacao_status = 1 AND l.id_pagamento = 2`;

        const result = await sequelize.query(sql, {
            replacements: { id_usuario },
            type: QueryTypes.SELECT,
        })

        console.log(result);
        res.json(result);
    } catch(error) {
        console.error('Erro ao buscar dados da locação do usuário:', error);
        res.status(500).json({ erro: 'Erro ao buscar dados da locação do usuário' })
    }
});

router.put('/update/', async (req, res) => {
    const {
        imagePath,
        placa,
        quilometragem,
        cpfUsuario,
        dataEntrega,
        dataDevolucao,
        idLocacao,
        valorLocacao
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
        const id_locacao = idLocacao;

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
                imagePath = :imagePath,
                valor = :valorLocacao 
                WHERE id = :id_locacao`,
                {
                    replacements: {
                        id_veiculo,
                        id_usuario,
                        quilometragemInt,
                        dataEntrega,
                        dataDevolucao,
                        imagePath,
                        valorLocacao,
                        id_locacao,
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

router.put('/disponibilityUpdate/', async (req, res) => {
    const {
        imagePath,
        placa,
        quilometragem,
        cpfUsuario,
        nomeUsuario,
        dataEntrega,
        dataDevolucao,
        idLocacao,
        valorLocacao,
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
        const id_locacao_status = 1;
        const id_pagamento = 2;

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
                imagePath = :imagePath, 
                id_locacao_status = :id_locacao_status,
                id_pagamento = :id_pagamento,
                valor = :valorLocacao
                WHERE id = :idLocacao`,
                {
                    replacements: {
                        id_veiculo,
                        id_usuario,
                        quilometragemInt,
                        dataEntrega,
                        dataDevolucao,
                        imagePath,
                        id_locacao_status,
                        id_pagamento,
                        idLocacao,
                        valorLocacao,
                    },
                    type: QueryTypes.UPDATE,
                }
        );
    
        if (resultInsert === 0) {
            throw new Error('Error ao atualizar Locação');
        }

        const [resultUpdate] = await sequelize.query(
            `UPDATE tbl_veiculo 
                SET  disponibilidade = 1
                WHERE id = :id_veiculo`,
            {
                replacements: {
                    id_veiculo
                },
                type: QueryTypes.UPDATE,
            }
        );

        if (resultUpdate === 0) {
            throw new Error(`Error ao tentar alterar disponibilidade do veículo, id_veiculo: ${id_veiculo}`);
        }

        res.status(200).json({ message: `Error ao tentar alterar disponibilidade do veículo, id_veiculo: ${id_veiculo}` });

    } catch (error) {
        console.error('Erro ao atualizar Locação:', error);
        res.status(500).json({ error: error.message });
    }

});

module.exports = router;

//`Error ao tentar alterar disponibilidade do veículo, id_veiculo: ${id_veiculo}`