const ventasModel = require('../models/ventasModel');

async function agregarVenta(usuarioId, productoId, cantidad) {
    await ventasModel.agregarVenta(usuarioId, productoId, cantidad);
}

async function obtenerProductosVentas(usuarioId) {
    return await ventasModel.obtenerProductosVentas(usuarioId);
}

async function actualizarCantidadVenta(nuevaCantidad, usuarioId, productoId) {
    await ventasModel.actualizarCantidadVenta(nuevaCantidad, usuarioId, productoId);
}

async function quitarProductoVentas(usuarioId, productoId) {
    await ventasModel.quitarProductoVentas(usuarioId, productoId);
}

module.exports = {
    agregarVenta,
    obtenerProductosVentas,
    actualizarCantidadVenta,
    quitarProductoVentas
};
