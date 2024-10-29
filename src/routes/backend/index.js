const express = require('express');
const profissoesRoutes = require('./profissoes');
const estadosCivisRoutes = require('./estadoCivis');

const router = express.Router();

router.use('/profissoes', profissoesRoutes);
router.use('/estadosCivis', estadosCivisRoutes);

module.exports = router;