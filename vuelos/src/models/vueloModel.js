const mysql = require('mysql2/promise');


const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port:'3307',
    database: 'vuelosDB'
});

async function traerVuelos() {
    try{
    const result = await connection.query('SELECT * FROM vuelo');
    return result[0];
    } catch (error) {
    console.error('Error al traer vuelos:', error);
    throw error;
    }
}

async function traerVuelo(id) {
    try{
    const result = await connection.query('SELECT * FROM vuelo WHERE id = ?', id);
    return result[0];
    } catch (error) {
    console.error('Error al traer vuelo:', error);
    throw error;
}
}

async function crearVuelo(ciudadOrigen, ciudadDestino, capacidad, costo) {
    try{
    const result = await connection.query('INSERT INTO vuelo VALUES(null,?,?,?,?)', [ciudadOrigen, ciudadDestino, capacidad, costo]);
    console.log(result[0]);
    return 'El vuelo ha sido creado';
    } catch (error) {
    console.error('Error al crear vuelo:', error);
    throw error;
    }
}
async function actualizarVuelo(id, capacidad) {
    const result = await connection.query('UPDATE vuelo SET capacidad = ? WHERE id = ?', [capacidad, id]);
    return result;
}


module.exports = {
    traerVuelos,
    traerVuelo,
    crearVuelo,
    actualizarVuelo,}