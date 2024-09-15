
const { Router } = require('express');
const router = Router();
const planesModel = require('../models/planesModel');
const { traerVuelo } = require('../../../vuelos/src/models/vueloModel');

//listar planes
router.get('/planes', async (req, res) => {
    var result;
    result = await planesModel.traerPlanes();
    if(result.length > 0){
        res.json(result);
    }else{
        res.send("Error al listar los planes")
    }
});

//obetenr plan por id
router.get('/planes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    var result;
    result = await planesModel.traerPlan(id);
    if (result.length > 0) {
        res.json(result[0]);
    } else {
        res.send(`Plan no encontrado con el id: ${req.params.id} `)  
    }
  } catch (error) {
    res.send("Error al encontrar el plan")
  }
});

//crear planes
//router.post('/planes', async (req, res) => {

    // const usuario = req.body.usuario; //trae info del user que hace la orden
    // const vueloId = req.body.vueloId; //items. Arreglo que dice que productos el user compro y que cantidad compró
    // const hotel= req.body.hotel;
    // const ciudadHotel = req.body.ciudadHotel;

//     const costo = await calcularCosto(items);

//     const vueloInfo = await axios.get(`http://localhost:3002/vuelos/${vueloId}`)
//     const vuelo = vueloInfo.data;

// // Si el total es 0 o negativo, retornamos un error
// if (vuelo.capacidad <= 0) {
// return res.send("No hay capacidad disponible en este vuelo")
// }

// const hotelInfo = await axios.get(`http://localhost:3003/hoteles/${hotelId}`);
// const hotel = hotelInfo.data;

// // Si no hay suficientes unidades de los productos, retornamos un error
// if (hotel.capacidad <= 0) {
// return res.send("No hay capcidad disponible en este hotel");
// }

// const costoTotal = vuelo.costo + hotel.costo;

// // Creamos la orden
// const response = await axios.get(`http://localhost:3001/usuarios/${usuario}`);
// const { nombre: name} = response.data;

// const plan= { usuario: name};
// await palnesModel.crearOrden(plan);

// // Disminuimos la cantidad de unidades de los productos
// await actualizarHotel(hotel);
// await actualizarVuelo(vuelo);

// res.send('Orden creada');
// });


router.post('/planes', async (req, res) => {
    const { vuelo, hotel, usuarioId } = req.body;
  
    try {
      // Obtener los IDs del vuelo y hotel a partir de los nombres (suponiendo que tienes funciones para esto)
      const vueloId = await traerVuelo(id);// axios
      const hotelId = await traerHotelNombre(hotel);//axios
  
      // Verificar disponibilidad
      const disponible = await verificarDisponibilidadServicios(vueloId, hotelId);
      if (!disponible) {
        return res.status(400).json({ error: 'Vuelo o hotel no disponible' });
      }
  
      // Calcular costo
      const costoTotal = await calcularCosto(vueloId, hotelId);
  
      // Crear el plan (suponiendo un modelo de datos para planes)
      const nuevoPlan = await Plan.create({
        ciudad: '...', // Obtener ciudad desde alguna fuente
        vueloId,
        hotelId,
        costo: costoTotal,
        usuarioId
      });
  
      // Actualizar capacidad de vuelo y hotel
      await actualizarVuelo({ id: vueloId });
      await actualizarHotel({ id: hotelId });
  
      return res.status(201).json(nuevoPlan);
    } catch (error) {
      console.error('Error al crear el plan:', error);
      return res.status(500).json({ error: 'Error al crear el plan' });
    }
  });

async function verificarDisponibilidadServicios(vueloId, hotelId) {
    let vueloDisponible = true;
    let hotelDisponible = true;

    if (vueloId) {
        const vueloResponse = await axios.get(`http://localhost:3002/vuelos/${vueloId}`);
        vueloDisponible = vueloResponse.data.capacidad > 0;
    }

    if (hotelId) {
        const hotelResponse = await axios.get(`http://localhost:3003/hoteles/${hotelId}`);
        hotelDisponible = hotelResponse.data.capacidad > 0;
    }

    return vueloDisponible && hotelDisponible;
}


// Función para verificar si hay suficientes unidades de los productos para realizar la orden
async function actualizarVuelo(vuelo) {
    const response = await axios.get(`http://localhost:3002/vuelos/${vuelo.id}`);
    const capacidadActual = response.data.capacidad;
    const cap = capacidadActual - 1;
    await axios.put(`http://localhost:3002/vuelos/${vuelo.id}`, {
        capacidad: cap
    });
}

// Función para actualizar la capacidad del hotel
async function actualizarHotel(hotel) {
    const response = await axios.get(`http://localhost:3003/hoteles/${hotel.id}`);
    const capacidadActual = response.data.capacidad;
    const cap = capacidadActual - 1;
    await axios.put(`http://localhost:3003/hoteles/${hotel.id}`, {
        capacidad: cap
    });
}


async function calcularCosto(vueloId, hotelId) {
  // Suponiendo que las URLs de las APIs son:
  const urlVuelo = `http://localhost:3002/vuelos/${vuelo.id}`;
  const urlHotel = `http://localhost:3003/hoteles/${hotel.id}`;

  try {
    // Peticiones paralelas utilizando Promise.all
    const [responseVuelo, responseHotel] = await Promise.all([
      axios.get(urlVuelo),
      axios.get(urlHotel)
    ]);

    const costoVuelo = responseVuelo.data.costo;
    const costoHotel = responseHotel.data.costo;

    return costoVuelo + costoHotel;
  } catch (error) {
    console.error('Error al obtener los costos:', error);
    return null;
  }
}

module.exports = router;
