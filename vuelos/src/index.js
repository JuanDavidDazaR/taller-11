const express = require('express');
const vuelosController = require("./controllers/vueloController");
const morgan = require('morgan'); 
const app = express();
app.use(morgan('dev'));
app.use(express.json());


app.use(vuelosController);


app.listen(3002, () => {
  console.log('Microservicio Vuelos ejecutandose en el puerto 3002');
});