const ventasService = require('../services/ventasService');

async function agregarVenta(req, res) {
    const { usuarioId, productoId, cantidad } = req.body;
    try {
        await ventasService.agregarVenta(usuarioId, productoId, cantidad);
        res.status(200).json({ message: 'Producto agregado a ventas correctamente' });
    } catch (error) {
        console.error('Error al agregar el producto a ventas:', error.message);
        res.status(500).json({ message: 'Error al agregar el producto a ventas' });
    }
}

async function obtenerProductosVentas(req, res) {
    const { usuarioId } = req.params;
    try {
        const productos = await ventasService.obtenerProductosVentas(usuarioId);
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al obtener los productos de ventas:', error.message);
        res.status(500).json({ message: 'Error al obtener los productos de ventas' });
    }
}

async function actualizarCantidadVenta(req, res) {
    const { cantidad, usuarioId, productoId } = req.body;
    try {
        await ventasService.actualizarCantidadVenta(cantidad, usuarioId, productoId);
        res.status(200).json({ message: 'Cantidad de producto en ventas actualizada' });
    } catch (error) {
        console.error('Error al actualizar la cantidad en el carrito:', error.message);
        res.status(500).json({ message: 'Error al actualizar la cantidad en ventas' });
    }
}

async function quitarProductoVentas(req, res) {
    const { usuarioId, productoId } = req.params;
    try {
        await ventasService.quitarProductoVentas(usuarioId, productoId);
        res.status(200).json({ message: 'Producto eliminado de ventas correctamente' });
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error.message);
        res.status(500).json({ message: 'Error al eliminar el producto de ventas' });
    }
}

module.exports = {
    agregarVenta,
    obtenerProductosVentas,
    actualizarCantidadVenta,
    quitarProductoVentas
};
