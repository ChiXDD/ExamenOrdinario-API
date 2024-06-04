const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/autenticador');
const comprasController = require('../controllers/comprasController');

// Rutas relacionadas con el carrito de compras
router.post('/agregar', verificarToken, comprasController.agregarCompra);
router.get('/:usuarioId', verificarToken, comprasController.obtenerProductosCompras);
router.put('/actualizar-compra', verificarToken, comprasController.actualizarCantidadCompra);
router.delete('/:usuarioId/:productoId', verificarToken, comprasController.quitarProductoCompras);

module.exports = router;
