const comprasService = require('../services/comprasService');

async function agregarCompra(req, res) {
    const { usuarioId, productoId, cantidad } = req.body;
    try {
        await comprasService.agregarCompra(usuarioId, productoId, cantidad);
        res.status(200).json({ message: 'Producto agregado a compras correctamente' });
    } catch (error) {
        console.error('Error al agregar el producto a compras:', error.message);
        res.status(500).json({ message: 'Error al agregar el producto a compras' });
    }
}

async function obtenerProductosCompras(req, res) {
    const { usuarioId } = req.params;
    try {
        const productos = await comprasService.obtenerProductosCompras(usuarioId);
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al obtener los productos de compras:', error.message);
        res.status(500).json({ message: 'Error al obtener los productos de compras' });
    }
}

async function actualizarCantidadCompra(req, res) {
    const { cantidad, usuarioId, productoId } = req.body;
    try {
        await comprasService.actualizarCantidadCompra(cantidad, usuarioId, productoId);
        res.status(200).json({ message: 'Cantidad de producto en compras actualizada' });
    } catch (error) {
        console.error('Error al actualizar la cantidad en el carrito:', error.message);
        res.status(500).json({ message: 'Error al actualizar la cantidad en compras' });
    }
}

async function quitarProductoCompras(req, res) {
    const { usuarioId, productoId } = req.params;
    try {
        await comprasService.quitarProductoCompras(usuarioId, productoId);
        res.status(200).json({ message: 'Producto eliminado de compras correctamente' });
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error.message);
        res.status(500).json({ message: 'Error al eliminar el producto de compras' });
    }
}

module.exports = {
    agregarCompra,
    obtenerProductosCompras,
    actualizarCantidadCompra,
    quitarProductoCompras
};
