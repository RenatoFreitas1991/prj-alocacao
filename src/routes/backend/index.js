const express = require('express');
const router = express.Router();

const profissoesRouter = require('./profissoes');
const estadosCivisRouter = require('./estadoscivis');
const userRouter = require('./user');  // Importando rotas de usuário
const vehicleRouter = require('./vehicle');
const authUserRouter = require('./AuthUser');
const vehicles = require('./vehicles');

router.use('/profissoes', profissoesRouter);
router.use('/estadosCivis', estadosCivisRouter);
router.use('/auth', authUserRouter);
router.use('/user', userRouter);       // Prefixo para as rotas de usuário
router.use('/vehicles', vehicleRouter);
router.use('/vehicles', vehicles);

module.exports = router;
