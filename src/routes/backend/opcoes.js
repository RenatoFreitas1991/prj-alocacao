const express = require('express');
const router = express.Router();
const Marca = require('../../models/marca');
const Cor = require('../../models/cor');
const Combustivel = require('../../models/combustivel');
const TipoVeiculo = require('../../models/tipoVeiculo');

router.get('/marcas', async (req, res) => {
    try {
        const marcas = await Marca.findAll({ attributes: ['id', 'marca'] });
        res.json(marcas);
    } catch (error) {
        console.error('Erro ao buscar marcas:', error);
        res.status(500).json({ error: 'Erro ao buscar marcas' });
    }
});

router.get('/cores', async (req, res) => {
    try {
        const cores = await Cor.findAll({ attributes: ['id', 'cor'] });
        res.json(cores);
    } catch (error) {
        console.error('Erro ao buscar cores:', error);
        res.status(500).json({ error: 'Erro ao buscar cores' });
    }
});

router.get('/combustiveis', async (req, res) => {
    try {
        const combustiveis = await Combustivel.findAll({ attributes: ['id', 'combustivel'] });
        res.json(combustiveis);
    } catch (error) {
        console.error('Erro ao buscar combustíveis:', error);
        res.status(500).json({ error: 'Erro ao buscar combustíveis' });
    }
});

router.get('/tipos-veiculo', async (req, res) => {
    try {
        const tipos = await TipoVeiculo.findAll({ attributes: ['id', 'tipo_veiculo'] });
        res.json(tipos);
    } catch (error) {
        console.error('Erro ao buscar tipos de veículo:', error);
        res.status(500).json({ error: 'Erro ao buscar tipos de veículo' });
    }
});

module.exports = router;
