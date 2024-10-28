const express = require('express');
const router = express.Router();
const Profissao = require('../screens/models/profissao/profissao');


router.get('/profissoes', async (req, res) => {
  try {
    const profissoes = await Profissao.findAll();
    res.json(profissoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar profissões' });
  }
});

module.exports = router;