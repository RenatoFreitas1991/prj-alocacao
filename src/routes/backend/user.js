const express = require('express');
const router = express.Router();
const { Usuario, Contato, Endereco, Profissao, EstadoCivil, Avaliacao } = require('../../models');
const sequelize = require('../../config/database');
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

      // **Inserindo em Avaliacao**
      const avaliacao = await Avaliacao.create({
        id_avaliacao: 0,
        motivo: 'Avaliação inicial'
      }, { transaction: t });

      // Inserindo em Usuario
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

module.exports = router;