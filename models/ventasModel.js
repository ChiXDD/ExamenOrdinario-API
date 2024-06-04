const { obtenerConexion } = require('../database/conexion');

async function verificarProductoEnVentas(usuarioId, productoId) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query(
            'SELECT * FROM ventas WHERE usuario_id = ? AND producto_id = ?',
            [usuarioId, productoId]
        );
        return results.length > 0;
    } catch (error) {
        console.error('Error al verificar el ventas:', error.message);
        throw error;
    } finally {
        conexion.release();
    }
}

async function agregarVenta(usuarioId, productoId, cantidad) {
    const productoEnVenta = await verificarProductoEnVentas(usuarioId, productoId);

    if (productoEnVenta) {
        await actualizarCantidadVenta(cantidad, productoId);
    } else {
        const conexion = await obtenerConexion();
        try {
            await conexion.query(
                `INSERT INTO ventas (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)`,
                [usuarioId, productoId, cantidad]
            );
            console.log('Producto agregado a ventas');
        } catch (error) {
            console.error('Error al agregar el producto a ventas:', error.message);
            throw error;
        } finally {
            conexion.release();
        }
    }
}

async function quitarProductoVentas(usuarioId, productoId) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query(
            `DELETE FROM ventas WHERE producto_id = ? AND usuario_id = ?`,
            [productoId, usuarioId]
        );
        console.log('Producto eliminado de ventas correctamente');
    } catch (error) {
        console.error('Error al eliminar el producto de ventas:', error.message);
        throw error;
    } finally {
        conexion.release();
    }
}

async function actualizarCantidadVenta(cantidad, productoId) {
    if (cantidad < 1) {
        await quitarProductoVentas(productoId);
    } else {
        const conexion = await obtenerConexion();
        try {
            await conexion.query(
                `UPDATE ventas SET cantidad = ? WHERE producto_id = ?`,
                [cantidad, productoId]
            );
            console.log('Cantidad de producto en ventas actualizada');
        } catch (error) {
            console.error('Error al actualizar la cantidad en ventas:', error.message);
            throw error;
        } finally {
            conexion.release();
        }
    }
}

async function obtenerProductosVentas(usuarioId) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query(
            `
            SELECT productos.id, productos.nombre, ventas.cantidad, productos.precio_venta, productos.imagen
            FROM ventas
            JOIN productos ON ventas.producto_id = productos.id
            WHERE ventas.usuario_id = ?
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
    agregarVenta,
    obtenerProductosVentas,
    actualizarCantidadVenta,
    quitarProductoVentas
};
