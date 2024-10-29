const express = require('express');
const router = express.Router();
const Profissao = require('../../models/profissao');

router.get('/', async (req, res) => {
  try {
    const profissoes = await Profissao.findAll();
    res.json(profissoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar profissões' });
  }
});

module.exports = router;
