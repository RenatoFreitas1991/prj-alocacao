const express = require('express');
const router = express.Router();
const { Usuario, Contato, Endereco, Profissao, EstadoCivil, Avaliacao } = require('../../models');
const sequelize = require('../../config/database');
const { formatCPF } = require('../../utils/cpfUtils');
const bcrypt = require('bcrypt');
const { QueryTypes } = require('sequelize');

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
  const {
    nome,
    cpf,
    cnh,
    nascimento,
    senha,
    rg,
    orgao_expedidor,
    email,
    telefone,
    cep,
    cidade,
    rua,
    bairro,
    numero,
    profissao,
    estado_civil
  } = req.body;

  try {
    const result = await sequelize.transaction(async (t) => {

      // Inserindo em Contato
      const contato = await Contato.create({
        email,
        telefone
      }, { transaction: t });

      // Inserindo em Endereço
      const endereco = await Endereco.create({
        cidade,
        rua,
        bairro,
        cep,
        numero
      }, { transaction: t });

      // Obtendo id_profissao
      const profissaoRecord = await Profissao.findOne({
        where: { profissao }
      }, { transaction: t });

      if (!profissaoRecord) {
        throw new Error('Profissão não encontrada');
      }

      // Obtendo id_estado_civil
      const estadoCivilRecord = await EstadoCivil.findOne({
        where: { estado_civil: estado_civil }
      }, { transaction: t });

      if (!estadoCivilRecord) {
        throw new Error('Estado civil não encontrado');
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(senha, 10);

      const avaliacao = await Avaliacao.create({
        avaliacao: 0, 
        motivo: 'Avaliação inicial'
      }, { transaction: t });

      const usuario = await Usuario.create({
        nome,
        cpf,
        cnh,
        nascimento,
        senha: hashedPassword,
        rg,
        orgao_expedidor,
        id_contato: contato.id,
        id_endereco: endereco.id,
        id_profissao: profissaoRecord.id,
        id_estado_civil: estadoCivilRecord.id,
        id_avaliacao: avaliacao.id,
        blacklist: 0
      }, { transaction: t });

      return usuario;
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso', usuario: result });

  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para adicionar um usuário à blacklist usando o CPF
router.put('/blacklist', async (req, res) => {
  let { cpf, motivo } = req.body;

  // Formatar CPF para garantir a consistência com o banco de dados
  cpf = formatCPF(cpf);

  try {
    // Encontrar o usuário pelo CPF formatado
    const usuario = await Usuario.findOne({ where: { cpf } });

    if (!usuario) {
      console.log('Usuário não encontrado');
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualizar o campo blacklist e salvar o motivo
    usuario.id_blacklist = 1;
    usuario.motivo_blacklist = motivo;
    await usuario.save();

    res.status(200).json({ message: 'Usuário adicionado à blacklist com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar blacklist:', error);
    res.status(500).json({ error: 'Erro ao atualizar blacklist' });
  }
});


router.delete('/blacklist', async (req, res) => {
  const { cpf } = req.body;

  try {
    // Encontrar o usuário pelo CPF
    const usuario = await Usuario.findOne({ where: { cpf } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualizar o campo blacklist para 0 e remover o motivo
    usuario.id_blacklist = 2;
    usuario.motivo_blacklist = null;
    await usuario.save();

    res.status(200).json({ message: 'Usuário removido da blacklist com sucesso' });
  } catch (error) {
    console.error('Erro ao remover da blacklist:', error);
    res.status(500).json({ error: 'Erro ao remover da blacklist' });
  }
});

router.get('/blacklist', async (req, res) => {

  try {
      const sql = `SELECT id, nome, cpf, motivo_blacklist 
                    FROM tbl_usuario 
                    WHERE id_blacklist = 1`;

      const result = await sequelize.query(sql, {
          type: QueryTypes.SELECT,
      });

      console.log(result);
      res.status(200).json(result);

  } catch (error) {
    console.error('Erro ao buscar usuários na blacklist:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários na blacklist' });
  }
});

router.get('/info/:cpf', async (req, res) => {
  const cpf = req.params.cpf;

  try {
      const findInfoUserByCpf = await sequelize.query(
          `SELECT u.nome, u.cpf, u.cnh, u.nascimento, p.profissao, c.telefone 
            FROM tbl_usuario u 
            INNER JOIN tbl_profissao p ON p.id = u.id_profissao 
            INNER JOIN tbl_contato c ON c.id = u.id_contato
            WHERE cpf = :cpf`,
          {
              replacements: { cpf },
              type: QueryTypes.SELECT,
          }
      );

      console.log(findInfoUserByCpf);
      res.json(findInfoUserByCpf);
  } catch(error) {
      console.error('Erro ao buscar dados do usuários:', error);
      res.status(500).json({ erro: 'Erro ao buscar dados do usuário' })
  }
});

router.get('/info/blacklist/:cpf', async (req, res) => {
  const cpf = req.params.cpf;

  try {
      const findBlackListInfoUserByCpf = await sequelize.query(
          `SELECT u.id, u.nome, u.cpf FROM tbl_usuario u 
            WHERE u.cpf = :cpf AND u.id_blacklist = 1;`,
          {
              replacements: { cpf },
              type: QueryTypes.SELECT,
          }
      );

      console.log(findBlackListInfoUserByCpf);
      res.json(findBlackListInfoUserByCpf);
  } catch(error) {
      console.error('Erro ao buscar dados do usuário a partir do usuário:', error);
      res.status(500).json({ erro: 'Erro ao buscar dados do usuário a partir do usuário' })
  }
});

module.exports = router;