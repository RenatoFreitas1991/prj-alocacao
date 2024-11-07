const express = require('express');
const router = express.Router();
const profissoesRouter = require('./profissoes');
const estadosCivisRouter = require('./estadoscivis');
const userRouter = require('./user');
const authUserRouter = require('./AuthUser');
//const vehiclesRouter = require('./vehicles'); // Roteador para operações de veículos, como disponibilidade
const vehicleRegister = require('./vehicle'); // Roteador para registro de veículos
const opcoesRouter = require('./opcoes'); 
const uploadRouter = require('./upload'); // Importe o roteador de upload

// Adicione as rotas ao roteador principal
router.use('/profissoes', profissoesRouter);
router.use('/estadosCivis', estadosCivisRouter);
router.use('/auth', authUserRouter);
router.use('/user', userRouter);
//router.use('/vehicles', vehiclesRouter);
router.use('/opcoes', opcoesRouter);
router.use('/upload', uploadRouter); // Use o roteador de upload
router.use('/vehicle', vehicleRegister);

module.exports = router;
