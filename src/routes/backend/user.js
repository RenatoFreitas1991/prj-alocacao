const express = require('express');
const router = express.Router();
const { Usuario, Contato, Endereco, Profissao, EstadoCivil, Avaliacao } = require('../../models');
const sequelize = require('../../config/database');
const { formatCPF } = require('../../utils/cpfUtils');
const bcrypt = require('bcrypt');

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
    usuario.blacklist = 1;
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
    usuario.blacklist = 0;
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
    const usuariosNaBlacklist = await Usuario.findAll({
      where: { blacklist: 1 },
      attributes: ['cpf', 'nome', 'motivo_blacklist'] // Ajuste os campos que deseja retornar
    });

    res.status(200).json(usuariosNaBlacklist);
  } catch (error) {
    console.error('Erro ao buscar usuários na blacklist:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários na blacklist' });
  }
});

module.exports = router;