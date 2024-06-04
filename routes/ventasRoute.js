const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/autenticador');
const ventasController = require('../controllers/ventasController');

// Rutas relacionadas con el carrito de compras
router.post('/agregar', verificarToken, ventasController.agregarVenta);
router.get('/:usuarioId', verificarToken, ventasController.obtenerProductosVentas);
router.put('/actualizar-venta', verificarToken, ventasController.actualizarCantidadVenta);
router.delete('/:usuarioId/:productoId', verificarToken, ventasController.quitarProductoVentas);

module.exports = router;
