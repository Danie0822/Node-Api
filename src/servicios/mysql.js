const mysql = require('mysql');
const config = require('../config');

// Crear un pool de conexiones
const pool = mysql.createPool({
    connectionLimit: 10,
    ...config.mysql
});

// Función para ejecutar consultas preparadas
function ejecutarConsulta(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

// Función para obtener todos los registros de una tabla
function todos(tabla) {
    const sql = `SELECT * FROM ??`;
    return ejecutarConsulta(sql, [tabla]);
}

// Función para obtener un solo registro de una tabla por su ID
function uno(tabla, id, campoIdentificacion) {
    const sql = `SELECT * FROM ?? WHERE ?? = ?`;
    return ejecutarConsulta(sql, [tabla, campoIdentificacion, id]);
}

// Función para agregar un nuevo registro a una tabla
function agregar(tabla, data) {
    const sql = `INSERT INTO ?? SET ?`;
    return ejecutarConsulta(sql, [tabla, data]);
}

// Función para eliminar un registro de una tabla
function eliminar(tabla, id, nombreid) {
    const sql = `DELETE FROM ?? WHERE ?? = ?`;
    return ejecutarConsulta(sql, [tabla, nombreid, id]);
}

// Función para actualizar un registro en una tabla
function actualizar(tabla, data, campoIdentificacion, id) {
    const sql = `UPDATE ?? SET ? WHERE ?? = ?`;
    return ejecutarConsulta(sql, [tabla, data, campoIdentificacion, id]);
}


// Exportar las funciones para su uso fuera del módulo
module.exports = {
    todos,
    agregar,
    eliminar,
    uno, 
    actualizar
};
