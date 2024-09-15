const express = require('express');
const router = express.Router();
const vuelosModel = require('../models/vueloModel');

router.get('/vuelos', async (req, res) => {
    const vuelos = await vuelosModel.traerVuelos();
    res.json(vuelos);
});

router.get('/vuelos/:id', async (req, res) => {
    const { id } = req.params;

    const vuelo = await vuelosModel.traerVuelo(id);
    res.json(vuelo);
});

router.post('/vuelos', async (req, res) => {
    const ciudadOrigen = req.body.ciudadOrigen;
    const ciudadDestino = req.body.ciudadDestino;
    const capacidad = req.body.capacidad;
    const costo = req.body.costo;

    const result = await vuelosModel.crearVuelo(ciudadOrigen, ciudadDestino, capacidad, costo);
    res.json({ message: result });
});

module.exports = router;