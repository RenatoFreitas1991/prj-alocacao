const express = require('express');
const router = express.Router();

const profissoesRouter = require('./profissoes');
const estadosCivisRouter = require('./estadoscivis');
const userRouter = require('./user');
const vehicleRouter = require('./vehicle');
const authUserRouter = require('./AuthUser');

router.use('/profissoes', profissoesRouter);
router.use('/estadosCivis', estadosCivisRouter);
router.use('/auth', authUserRouter);
router.use('/', userRouter);
router.use('/', vehicleRouter);

module.exports = router;