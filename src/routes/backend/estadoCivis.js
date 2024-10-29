const express = require('express');
const router = express.Router();
const EstadoCivil = require('../../models/estadoCivil');

router.get('/', async (req, res) => { 
  try {
    const estadosCivis = await EstadoCivil.findAll();
    res.json(estadosCivis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estados civis' });
  }
});

module.exports = router;