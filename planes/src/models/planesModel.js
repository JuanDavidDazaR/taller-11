const mysql = require('mysql2/promise');


const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port:'3307',
    database: 'planesDB'
});


async function traerPlanes() {
    const result = await connection.query('SELECT * FROM plan');
    return result[0];
}

async function traerPlan(id) {
    const result = await connection.query('SELECT * FROM plan WHERE id = ?', [id]);
    return result[0];
}


async function crearPlan(plan) {

    const ciudad = plan.ciudad;
    const vuelo = plan.vuelo;
    const hotel = plan.hotel;
    const usuario = plan.usuario;
    const costo = plan.costo;

    const result = await connection.query('INSERT INTO plan VALUES (null, ?, ?, ?, ?, ?)', [ciudad, vuelo, hotel, costo, usuario]);
    return result;

}


module.exports = {
    traerPlanes, traerPlan, crearPlan
};