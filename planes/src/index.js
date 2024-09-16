const express = require('express');
const cors = require('cors');
const planesController = require('./controllers/planesController');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Asegúrate de que el controlador esté en la ruta correcta y configurado
app.use(planesController);

app.listen(3004, () => {
  console.log('Microservicio Planes ejecutándose en el puerto 3004');
});
