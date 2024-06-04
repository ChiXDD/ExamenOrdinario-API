const express = require('express');
const router = express.Router();

// Importar rutas específicas
const ventasRoute = require('./ventasRoute');
const comprasRoute = require('./comprasRoute');
const productosRoute = require('./productosRoute');
const usuariosRoute = require('./usuariosRoute');

// Rutas específicas para ventas
router.use('/ventas', ventasRoute);

// Rutas específicas para compras
router.use('/compras', comprasRoute);

// Rutas específicas para productos
router.use('/productos', productosRoute);

// Rutas específicas para usuarios
router.use('/usuarios', usuariosRoute);

module.exports = router;
