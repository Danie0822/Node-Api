// funciones de repuestas si pasa algun error 
const respuestas = require('./respuestas'); 

function errors(err, req, res, next){
    const mensaje = err.mensaje || 'Error interno'; 
    const status = err.statusCode || 500; 

    respuestas.error(req, res, mensaje, status); 
}

module.exports = errors; 