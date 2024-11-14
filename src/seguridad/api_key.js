const config = require('../config');
const respuestas = require('../red/respuestas');

function verificarClaveAPI(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== config.apiKey) {
        return respuestas.error(req, res, 'Clave API no válida', 403);
    }
    next();
}

module.exports = verificarClaveAPI;
