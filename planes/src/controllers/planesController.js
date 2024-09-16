
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

  try {
    if (vueloId) {
      const vueloResponse = await fetch(`http://localhost:3002/vuelos/${vueloId}`);
      if (!vueloResponse.ok) {
        throw new Error(`Error al obtener datos del vuelo: ${vueloResponse.statusText}`);
      }
      const vueloData = await vueloResponse.json();

      // Mostrar los datos del vuelo para depuración
      console.log('Datos del vuelo:', vueloData);

      // Verificar si la respuesta del vuelo es válida
      if (!Array.isArray(vueloData) || vueloData.length === 0 || typeof vueloData[0].capacidad !== 'number') {
        throw new Error('Datos del vuelo no válidos');
      }

      vueloDisponible = vueloData[0].capacidad > 0;
    }

    if (hotelId) {
      const hotelResponse = await fetch(`http://localhost:3003/hoteles/${hotelId}`);
      if (!hotelResponse.ok) {
        throw new Error(`Error al obtener datos del hotel: ${hotelResponse.statusText}`);
      }
      const hotelData = await hotelResponse.json();

      // Mostrar los datos del hotel para depuración
      console.log('Datos del hotel:', hotelData);

      // Verificar si la respuesta del hotel es válida
      if (Array.isArray(hotelData)) {
        // Si la respuesta es un arreglo, verificar el primer elemento
        if (hotelData.length === 0 || typeof hotelData[0].capacidad !== 'number') {
          throw new Error('Datos del hotel no válidos');
        }
        hotelDisponible = hotelData[0].capacidad > 0;
      } else if (typeof hotelData.capacidad === 'number') {
        // Si la respuesta es un objeto simple, verificar la propiedad 'capacidad'
        hotelDisponible = hotelData.capacidad > 0;
      } else {
        throw new Error('Datos del hotel no válidos');
      }
    }
  } catch (error) {
    console.error('Error en verificar disponibilidad:', error.message);
    return false;  // Devolver false si ocurre un error
  }

  return vueloDisponible && hotelDisponible;
}


// Función para actualizar la capacidad del vuelo
async function actualizarVuelo(vueloId) {
  try {
    const response = await fetch(`http://localhost:3002/vuelos/${vueloId}`);
    const vueloData = await response.json();
    const nuevaCapacidad = vueloData[0].capacidad - 1;

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
    const hotelResponse = await fetch(`http://localhost:3003/hoteles?nombre=${encodeURIComponent(nombreHotel)}`);
    if (!hotelResponse.ok) {
      throw new Error(`Error al obtener datos del hotel: ${hotelResponse.statusText}`);
    }
    const hotelData = await hotelResponse.json();

    // Asegurarse de que la respuesta sea un arreglo y obtener el primer hotel con el nombre correcto
    if (!Array.isArray(hotelData) || hotelData.length === 0) {
      return res.status(404).json({ error: 'Hotel no encontrado.' });
    }

    const hotel = hotelData.find(h => h.nombre === nombreHotel);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel no encontrado.' });
    }

    const hotelId = hotel.id;
    const ciudad = hotel.ciudad;

    // Verificar disponibilidad
    const disponible = await verificarDisponibilidad(vuelo, hotelId);
    if (!disponible) {
      return res.status(400).json({ error: 'Vuelo o hotel no disponible' });
    }

    // Calcular costo
    const costoTotal = await calcularCosto(vuelo, hotelId);
    if (isNaN(costoTotal) || costoTotal === null) {
      return res.status(500).json({ error: 'Error en el cálculo del costo.' });
    }

    // Crear el plan
    const plan = {
      usuario,         // Guardar el username en lugar del ID
      ciudad,
      vuelo,
      hotel: nombreHotel,
      costo: costoTotal
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

