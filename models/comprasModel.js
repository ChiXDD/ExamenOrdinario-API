const { obtenerConexion } = require('../database/conexion');

async function verificarProductoEnCompras(usuarioId, productoId) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query(
            'SELECT * FROM compras WHERE usuario_id = ? AND producto_id = ?',
            [usuarioId, productoId]
        );
        return results.length > 0;
    } catch (error) {
        console.error('Error al verificar el compras:', error.message);
        throw error;
    } finally {
        conexion.release();
    }
}

async function agregarCompra(usuarioId, productoId, cantidad) {
    const productoEnCompra = await verificarProductoEnCompras(usuarioId, productoId);

    if (productoEnCompra) {
        await actualizarCantidadCompra(cantidad, productoId);
    } else {
        const conexion = await obtenerConexion();
        try {
            await conexion.query(
                `INSERT INTO compras (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)`,
                [usuarioId, productoId, cantidad]
            );
            console.log('Producto agregado a compras');
        } catch (error) {
            console.error('Error al agregar el producto a compras:', error.message);
            throw error;
        } finally {
            conexion.release();
        }
    }
}

async function quitarProductoCompras(usuarioId, productoId) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query(
            `DELETE FROM compras WHERE producto_id = ? AND usuario_id = ?`,
            [productoId, usuarioId]
        );
        console.log('Producto eliminado de compras correctamente');
    } catch (error) {
        console.error('Error al eliminar el producto de compras:', error.message);
        throw error;
    } finally {
        conexion.release();
    }
}

async function actualizarCantidadCompra(cantidad, productoId) {
    if (cantidad < 1) {
        await quitarProductoCompras(productoId);
    } else {
        const conexion = await obtenerConexion();
        try {
            await conexion.query(
                `UPDATE compras SET cantidad = ? WHERE producto_id = ?`,
                [cantidad, productoId]
            );
            console.log('Cantidad de producto en compras actualizada');
        } catch (error) {
            console.error('Error al actualizar la cantidad en compras:', error.message);
            throw error;
        } finally {
            conexion.release();
        }
    }
}

async function obtenerProductosCompras(usuarioId) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query(
            `
            SELECT productos.id, productos.nombre, compras.cantidad, productos.precio_compra, productos.imagen
            FROM compras
            JOIN productos ON compras.producto_id = productos.id
            WHERE compras.usuario_id = ?
            `,
            [usuarioId]
        );
        return results;
    } catch (error) {
        console.error('Error al obtener los productos del usuario ID:', error.message);
        throw error;
    } finally {
        conexion.release();
    }
}

module.exports = {
    agregarCompra,
    obtenerProductosCompras,
    actualizarCantidadCompra,
    quitarProductoCompras
};
