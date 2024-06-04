const { obtenerConexion } = require('../database/conexion');
const fs = require('fs');

async function obtenerTodos() {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM productos');
        return results;
    } catch (error) {
        console.error('Error al obtener los productos:', error.message);
        throw error;
    } finally {
        conexion.release();
    }
}

async function obtenerPorId(id) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM productos WHERE id = ?', [id]);
        if (results.length > 0) {
            return results[0];
        }
        return null;
    } catch (error) {
        console.error('Error al obtener el producto por ID:', error.message);
        throw error;
    } finally {
        conexion.release();
    }
}

async function actualizarCantidad(nuevaCantidad, productoId) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query('UPDATE productos SET cantidad = ? WHERE id = ?', [nuevaCantidad, productoId]);
        console.log('Cantidad de producto actualizada');
    } catch (error) {
        console.error('Error al actualizar la cantidad de producto:', error.message);
        throw error;
    } finally {
        conexion.release();
    }
}

// Funcion para aumentar 1 a la cantidad del producto en la base de datos
async function aumentarCantidad(productoId) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query('UPDATE productos SET cantidad = cantidad + 1 WHERE id = ?', [productoId]);
        console.log('Cantidad de producto aumentada');
    } catch (error) {
        console.error('Error al aumentar la cantidad de producto:', error.message);
        throw error;
    } finally {
        conexion.release();
    }
}

// Funcion para disminuir 1 a la cantidad del producto en la base de datos
async function disminuirCantidad(productoId) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query('UPDATE productos SET cantidad = cantidad - 1 WHERE id = ?', [productoId]);
        console.log('Cantidad de producto disminuida');
    } catch (error) {
        console.error('Error al disminuir la cantidad de producto:', error.message);
        throw error;
    } finally {
        conexion.release();
    }
}

//Funcion para subir producto a la base de datos
async function agregarProducto(producto) {
    const conexion = await obtenerConexion();
    try {
        const imagenBase64 = producto.imagen;
        const sql = "INSERT INTO productos (nombre, cantidad, precio_compra, precio_venta, imagen) VALUES ?";
        const values = [[producto.nombre, producto.cantidad, producto.precio_compra, producto.precio_venta, imagenBase64]];
        
        await new Promise((resolve, reject) => {
            conexion.query(sql, [values], (error, results) => {
                if (error) {
                    console.error('Error al agregar el producto:', error.message);
                    reject(error);
                } else {
                    console.log('Producto agregado correctamente');
                    resolve(results);
                }
            });
        });
    } catch (error) {
        console.error('Error al agregar el producto:', error.message);
        throw error;
    } finally {
        conexion.release();
    }
}



module.exports = {
    obtenerTodos,
    obtenerPorId,
    actualizarCantidad,
    aumentarCantidad,
    disminuirCantidad,
    agregarProducto
};