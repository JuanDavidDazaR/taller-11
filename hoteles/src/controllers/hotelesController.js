const { Router } = require('express');
const router = Router();
const hotelesModel = require('../models/hotelesModel');



router.get('/hoteles', async (req, res) => {
    var result;
    result = await hotelesModel.traerHoteles();
    //console.log(result);
    res.json(result);
});


router.get('/hoteles/:id', async (req, res) => {
    const id = req.params.id;
    var result;
    result = await hotelesModel.traerHotel(id);
    //console.log(result);
    res.json(result[0]);
});


router.post('/hotelesnombre', async (req, res) => {
    const { nombre } = req.body; // Obtener el nombre del hotel del body de la solicitud

    try {
        if (!nombre) {
            return res.status(400).json({ error: 'El nombre del hotel es obligatorio.' });
        }

        const hotel = await hotelesModel.traerHotelNombre(nombre);

        if (!hotel) {
            return res.status(404).json({ error: 'Hotel no encontrado.' });
        }

        return res.status(200).json(hotel);
    } catch (error) {
        console.error('Error al obtener el hotel:', error);
        return res.status(500).json({ error: 'Error al obtener el hotel.' });
    }
});


    router.post('/hoteles', async (req, res) => {
        const nombre = req.body.nombre;
        const ciudad = req.body.ciudad;
        const capacidad = req.body.capacidad;
        const costo = req.body.costo;

        var result = await hotelesModel.crearHotel(nombre, ciudad, capacidad, costo);
        res.send("Hotel creado");
    });


    router.put('/hoteles/:id', async (req, res) => {

        const capacidad = req.body.capacidad;
        const id = req.params.id;

        var result = await hotelesModel.actualizarHotel(id, capacidad);
        res.send("Capacidad actualizada");
    });


    router.delete('/hoteles/:id', async (req, res) => {
        const id = req.params.id;
        var result;
        result = await hotelesModel.borrarHotel(id);
        //console.log(result);
        res.send("Hotel borrado");
    });


    module.exports = router;