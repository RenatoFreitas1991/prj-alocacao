const express = require('express');
const router = express.Router();

const profissoesRouter = require('./profissoes');
<<<<<<< HEAD
const estadosCivisRouter = require('./estadoscivis'); // Ajustado para corresponder ao nome do arquivo
const userRouter = require('./user'); // Importa as rotas de usuário
const veiculoRouter = require('./vehicle');

router.use('/profissoes', profissoesRouter);
router.use('/estadosCivis', estadosCivisRouter);
router.use('/', userRouter); // Utiliza as rotas de usuário
router.use('/', veiculoRouter)
=======
const estadosCivisRouter = require('./estadoscivis');
const userRouter = require('./user');
const authUserRouter = require('./AuthUser');

router.use('/profissoes', profissoesRouter);
router.use('/estadosCivis', estadosCivisRouter);
router.use('/auth', authUserRouter);
router.use('/', userRouter);
>>>>>>> caebe3260f861393c9960b9698a4635d17b7a281

module.exports = router;
