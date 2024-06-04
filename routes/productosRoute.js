const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/autenticador');
const productosController = require('../controllers/productosController');

// Rutas para los productos
router.get('/', productosController.obtenerTodos);
router.get('/:id', productosController.obtenerPorId);
router.put('/actualizar-cantidad', verificarToken, productosController.actualizarCantidad);
router.put('/aumentar-cantidad', verificarToken, productosController.aumentarCantidad);
router.put('/disminuir-cantidad', verificarToken, productosController.disminuirCantidad);
router.put('/agregar-producto', verificarToken, productosController.agregarProducto);

module.exports = router;
