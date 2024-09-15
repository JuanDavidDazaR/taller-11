const { Router } = require('express');
const router = Router();
const usuariosModel = require('../models/usuariosModel');

// Listar usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const result = await usuariosModel.traerUsuarios();
        res.json(result);
    } catch (error) {
        res.send("Error al cargar los usuarios");
    }
});

// Obtener usuario por id
router.get('/usuarios/:usuario', async (req, res) => {
    try {
        const usuario = req.params.usuario;
        const result = await usuariosModel.traerUsuario(usuario);
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.send(`Error al buscar al usuario: ${req.params.usaurios}`);
        }
    } catch (error) {
        res.send("Error al buscar el usuario");
    }
});

// Validar usuario y contraseña
router.get('/usuarios/:usuario/:password', async (req, res) => {
    try {
        const { usuario, password } = req.params;
        const result = await usuariosModel.validarUsuario(usuario, password);
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send("Usuario o contraseña incorrectos, vuelva a intentarlo");
        }
    } catch (error) {
        res.send("Error al validar usuario");
    }
});

module.exports = router;
