const crypto = require('crypto'); // Importar módulo crypto

// Función para encriptar la clave con SHA-256
function encriptarClave(clave) {
    return crypto.createHash('sha256')
        .update(clave)
        .digest('hex');
}

// Exportar la función
exports.encriptarClave = encriptarClave;
