const mysql = require('mysql2/promise');


const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port:'3307',
    database: 'usuario'
});


async function traerUsuarios() {
    const result = await connection.query('SELECT * FROM usuario');
    return result[0];
}


async function traerUsuario(usuario) {
    const result = await connection.query('SELECT * FROM usuario WHERE usuario = ?', usuario);
    return result[0];
}


async function validarUsuario(usuario, password) {
    const result = await connection.query('SELECT * FROM usuario WHERE usuario = ? AND password = ?', [usuario, password]);
    return result[0];
}


module.exports = {
    traerUsuarios, traerUsuario, validarUsuario
};