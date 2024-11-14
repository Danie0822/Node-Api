// Campos de valores de las tablas 
const TABLE_NAME = 'Usuario';
const ID_FIELD = 'id';
// Funciones para mandar a llamar db 
module.exports = function (db) {
    async function todos() {
        return db.todos(TABLE_NAME);
    }
    async function obtenerPorId(id) {
        return db.uno(TABLE_NAME, id, ID_FIELD);
    }
    async function agregar(data) {
        return db.agregar(TABLE_NAME, data);
    }
    async function actualizar(data) {
        const {id, ...restosDatos} = data;
        return db.actualizar(TABLE_NAME,restosDatos, ID_FIELD, id);
    }
    async function eliminar(id) {
        return db.eliminar(TABLE_NAME, id, ID_FIELD);
    }

    return {
        todos,
        obtenerPorId,
        agregar, 
        actualizar, 
        eliminar
    };
};
