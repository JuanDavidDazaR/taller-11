
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





// Función para verificar disponibilidad de servicios
async function verificarDisponibilidad(vueloId, hotelId) {
  let vueloDisponible = true;
  let hotelDisponible = true;

  if (vueloId) {
    const vueloResponse = await fetch(`http://localhost:3002/vuelos/${vueloId}`);
    const vueloData = await vueloResponse.json();
    vueloDisponible = vueloData.capacidad > 0;
  }

  if (hotelId) {
    const hotelResponse = await fetch(`http://localhost:3003/hoteles/${hotelId}`);
    const hotelData = await hotelResponse.json();
    hotelDisponible = hotelData.capacidad > 0;
  }

  return vueloDisponible && hotelDisponible;
}

// Función para actualizar la capacidad del vuelo
async function actualizarVuelo(vueloId) {
  try {
    const response = await fetch(`http://localhost:3002/vuelos/${vueloId}`);
    const vueloData = await response.json();
    const nuevaCapacidad = vueloData.capacidad - 1;

    await fetch(`http://localhost:3002/vuelos/${vueloId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ capacidad: nuevaCapacidad }),
    });
  } catch (error) {
    console.error('Error al actualizar la capacidad del vuelo:', error);
  }
}

// Función para actualizar la capacidad del hotel
async function actualizarHotel(hotelId) {
  try {
    const response = await fetch(`http://localhost:3003/hoteles/${hotelId}`);
    const hotelData = await response.json();
    const nuevaCapacidad = hotelData.capacidad - 1;

    await fetch(`http://localhost:3003/hoteles/${hotelId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ capacidad: nuevaCapacidad }),
    });
  } catch (error) {
    console.error('Error al actualizar la capacidad del hotel:', error);
  }
}

// Función para calcular costo del plan
async function calcularCosto(vueloId, hotelId) {
  try {
    const [vueloResponse, hotelResponse] = await Promise.all([
      fetch(`http://localhost:3002/vuelos/${vueloId}`),
      fetch(`http://localhost:3003/hoteles/${hotelId}`)
    ]);

    const vueloData = await vueloResponse.json();
    const hotelData = await hotelResponse.json();

    console.log('Vuelo data:', vueloData);  // Verifica la estructura de la respuesta

    // Accede al primer elemento del array de vuelo
    const costoVuelo = vueloData[0]?.costo;  
    const costoHotel = hotelData.costo;

    console.log('Costo vuelo:', costoVuelo);
    console.log('Costo hotel:', costoHotel);

    // Validar que ambos costos sean números
    if (isNaN(costoVuelo) || isNaN(costoHotel)) {
      console.error('Costo de vuelo u hotel no es un número válido.');
      return NaN;
    }

    return costoVuelo + costoHotel;
  } catch (error) {
    console.error('Error al obtener los costos:', error);
    return NaN;
  }
}




// Controlador para crear un plan de viaje
router.post('/planes', async (req, res) => {
  const { vuelo, nombreHotel, usuario } = req.body;

  if (!vuelo || typeof vuelo !== 'string' || !nombreHotel || !usuario) {
    return res.status(400).json({ error: 'Datos incompletos o incorrectos' });
  }

  try {
    // Obtener el ID del hotel a partir del nombre
    const hotelResponse = await fetch(`http://localhost:3003/hoteles?nombre=${nombreHotel}`);
    const hotelData = await hotelResponse.json();
    const hotelId = hotelData.length > 0 ? hotelData[0].id : null;

    if (!hotelId) {
      return res.status(404).json({ error: 'Hotel no encontrado.' });
    }

    // Obtener la ciudad del hotel
    const ciudad = hotelData[0].ciudad;

    // Verificar disponibilidad
//const disponible = await verificarDisponibilidad(vuelo, hotelId);

   // if (!disponible) {
   //   return res.status(400).json({ error: 'Vuelo o hotel no disponible' });
    //}

    // Calcular costo
    const costoTotal = await calcularCosto(vuelo, hotelId);

    if (isNaN(costoTotal) || costoTotal === null) {
      return res.status(500).json({ error: 'Error en el cálculo del costo.' });
    }

    // Si el costo es válido, continúa con la inserción
    const nuevoPlan = {
      cliente: usuario,
      ciudad,
      vuelo,
      hotel: nombreHotel,
      costo: costoTotal
    };


    // Crear el plan
    const plan = {
      cliente: usuario,
      ciudad: ciudad,
      vuelo: vuelo,
      hotel: nombreHotel,
      costo: costoTotal,
    };

    const resultado = await planesModel.crearPlan(plan);

    // Actualizar la capacidad del vuelo y el hotel
    await actualizarVuelo(vuelo);
    await actualizarHotel(hotelId);

    return res.json({ mensaje: 'Plan de viaje creado exitosamente', plan: resultado });
  } catch (error) {
    console.error('Error al crear el plan:', error);
    return res.status(500).json({ error: 'Error al crear el plan' });
  }
});



module.exports = router;

