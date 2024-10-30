const express = require('express');
const router = express.Router();

const profissoesRouter = require('./profissoes');
const estadosCivisRouter = require('./estadoscivis'); // Ajustado para corresponder ao nome do arquivo
const userRouter = require('./user'); // Importa as rotas de usuário

router.use('/profissoes', profissoesRouter);
router.use('/estadosCivis', estadosCivisRouter);
router.use('/', userRouter); // Utiliza as rotas de usuário

module.exports = router;
