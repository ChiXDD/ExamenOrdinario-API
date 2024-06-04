const comprasModel = require('../models/comprasModel');

async function agregarCompra(usuarioId, productoId, cantidad) {
    await comprasModel.agregarCompra(usuarioId, productoId, cantidad);
}

async function obtenerProductosCompras(usuarioId) {
    return await comprasModel.obtenerProductosCompras(usuarioId);
}

async function actualizarCantidadCompra(nuevaCantidad, usuarioId, productoId) {
    await comprasModel.actualizarCantidadCompra(nuevaCantidad, usuarioId, productoId);
}

async function quitarProductoCompras(usuarioId, productoId) {
    await comprasModel.quitarProductoCompras(usuarioId, productoId);
}

module.exports = {
    agregarCompra,
    obtenerProductosCompras,
    actualizarCantidadCompra,
    quitarProductoCompras
};
