
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



// Función para obtener el ID del hotel a partir de su nombre
async function obtenerIdHotelPorNombre(nombre) {
    try {
        const response = await axios.post('http://localhost:3003/hotelesnombre', { nombre });
        const hotel = response.data;
        return hotel ? hotel.id : null;
    } catch (error) {
        console.error('Error al obtener el ID del hotel:', error);
        return null;
    }
}

// Función para obtener la ciudad del hotel a partir del ID del hotel
async function obtenerCiudadPorHotel(hotelId) {
    try {
        const response = await axios.get(`http://localhost:3003/hoteles/${hotelId}`);
        const hotel = response.data;
        return hotel ? hotel.ciudad : 'Ciudad desconocida';
    } catch (error) {
        console.error('Error al obtener la ciudad del hotel:', error);
        return 'Ciudad desconocida';
    }
}

// Función para verificar disponibilidad de servicios
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

// Función para actualizar la capacidad del vuelo
async function actualizarVuelo(vuelo) {
  try {
      const response = await axios.get(`http://localhost:3002/vuelos/${vuelo.id}`);
      const capacidadActual = response.data.capacidad;
      const nuevaCapacidad = capacidadActual - 1;

      await axios.put(`http://localhost:3002/vuelos/${vuelo.id}`, {
          capacidad: nuevaCapacidad
      });
  } catch (error) {
      console.error('Error al actualizar la capacidad del vuelo:', error);
  }
}

// Función para actualizar la capacidad del hotel
async function actualizarHotel(hotel) {
  try {
      const response = await axios.get(`http://localhost:3003/hoteles/${hotel.id}`);
      const capacidadActual = response.data.capacidad;
      const nuevaCapacidad = capacidadActual - 1;

      await axios.put(`http://localhost:3003/hoteles/${hotel.id}`, {
          capacidad: nuevaCapacidad
      });
  } catch (error) {
      console.error('Error al actualizar la capacidad del hotel:', error);
  }
}

// Función para calcular costo del plan
async function calcularCosto(vuelo, hotel) {
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
    return null;
  }
}


// Controlador para crear un plan de viaje
// Controlador para crear un plan de viaje
router.post('/planes', async (req, res) => {
  const { vuelo, nombreHotel, username } = req.body;

  // Validación de entrada
  if (!vuelo || typeof vuelo !== 'object' || !vuelo.id || !nombreHotel || !username) {
      return res.status(400).json({ error: 'Datos incompletos o incorrectos' });
  }

  try {
      // Obtener el ID del hotel a partir del nombre
      const hotelId = await obtenerIdHotelPorNombre(nombreHotel);

      if (!hotelId) {
          return res.status(404).json({ error: 'Hotel no encontrado.' });
      }

      // Obtener la ciudad del hotel
      const ciudad = await obtenerCiudadPorHotel(hotelId);

      // Verificar disponibilidad
      const disponible = await verificarDisponibilidadServicios(vuelo.id, hotelId);

      if (!disponible) {
          return res.status(400).json({ error: 'Vuelo o hotel no disponible' });
      }

      // Calcular costo
      const costoTotal = await calcularCosto(vuelo, hotelId);

      if (costoTotal === null) {
          return res.status(500).json({ error: 'Error al calcular el costo.' });
      }

      // Crear el plan utilizando la función crearPlan
      const nuevoPlan = {
          ciudad,
          vuelo,
          hotel: nombreHotel, // Guardar el nombre del hotel en lugar del ID
          usuario: usuario,   // Guardar el username en lugar del ID
          costo: costoTotal
      };

      const resultado = await crearPlan(nuevoPlan);

      if (resultado.error) {
          return res.status(400).json({ error: resultado.error });
      }

      // Actualizar la capacidad del vuelo
      await actualizarVuelo(vuelo);

      // Actualizar la capacidad del hotel
      await actualizarHotel({ id: hotelId });

      return res.status(201).json({ mensaje: 'Plan de viaje creado exitosamente', plan: resultado });
  } catch (error) {
      console.error('Error al crear el plan:', error);
      return res.status(500).json({ error: 'Error al crear el plan' });
  }
});




module.exports = router;
