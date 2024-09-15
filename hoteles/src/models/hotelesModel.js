const mysql = require('mysql2/promise');


const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3307',
    database: 'hotelesDB'
});


async function traerHoteles() {
    const result = await connection.query('SELECT * FROM hoteles');
    return result[0];
}

async function traerHotel(id) {
    const result = await connection.query('SELECT * FROM hoteles WHERE id = ?', id);
    return result[0];
}


async function traerHotelNombre(nombre) {
    const [result] = await connection.query('SELECT * FROM hoteles WHERE nombre = ?', [nombre]);
    return result[0]; // Devolver el primer resultado o null si no se encuentra
}


async function actualizarHotel(id, capacidad) {
    const result = await connection.query('UPDATE hoteles SET capacidad = ? WHERE id = ?', [capacidad, id]);
    return result;
}


async function crearHotel(nombre, ciudad, capacidad, costo) {
    const result = await connection.query('INSERT INTO hoteles VALUES(null,?,?,?,?)', [nombre, ciudad, capacidad, costo]);
    return result;
}


async function borrarHotel(id) {
    const result = await connection.query('DELETE FROM hoteles WHERE id = ?', id);
    return result[0];
}


module.exports = {
    traerHoteles, traerHotel, traerHotelNombre, actualizarHotel, crearHotel, borrarHotel
}