const productosModel = require('../models/productoModel');

async function obtenerTodos() {
    return await productosModel.obtenerTodos();
}

async function obtenerPorId(id) {
    return await productosModel.obtenerPorId(id);
}

async function actualizarCantidad(nuevaCantidad, productoId) {
    return await productosModel.actualizarCantidad(nuevaCantidad, productoId);
}

async function aumentarCantidad(productoId) {
    return await productosModel.aumentarCantidad(productoId);
}

async function disminuirCantidad(productoId) {
    return await productosModel.disminuirCantidad(productoId);
}

async function agregarProducto(producto) {
    return await productosModel.agregarProducto(producto);
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    actualizarCantidad,
    aumentarCantidad,
    disminuirCantidad,
    agregarProducto
};