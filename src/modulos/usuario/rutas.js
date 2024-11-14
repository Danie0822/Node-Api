// Dependecias necesarias 
const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const respuestas = require('../../red/respuestas');
const controlador = require('./index');
const removeExtraSpaces = require('../../servicios/remove_spaces');
const { encriptarClave } = require('../../servicios/crypto');
const verificarClaveAPI = require('../../seguridad/api_key');
const containsProfanity = require('../../servicios/leo_profanity');
// Middleware express-validator  de validación común para los campos de usuario
const validarUsuario = [
    body('nombre').notEmpty().trim().customSanitizer(removeExtraSpaces).isLength({ min: 4, max: 100 }).withMessage('El nombre es requerido y debe tener como máximo 100 caracteres').custom((value) => {
        if (containsProfanity(value)) {
            throw new Error('El nombre contiene palabras ofensivas');
        }
        return true;
    }),
    body('usuario').notEmpty().trim().customSanitizer(removeExtraSpaces).isLength({ min: 4, max: 100 }).withMessage('El usuario es requerido y debe tener como máximo 100 caracteres').custom((value) => {
        if (containsProfanity(value)) {
            throw new Error('El nombre contiene palabras ofensivas');
        }
        return true;
    }),
    body('correo_electronico').notEmpty().trim().customSanitizer(removeExtraSpaces).isEmail().withMessage('El correo electrónico debe ser válido y no puede estar vacío').isLength({ min: 6, max: 100 }).withMessage('El correo electrónico debe tener como máximo 100 caracteres'),
    body('clave').notEmpty().trim().customSanitizer(removeExtraSpaces).isLength({ min: 6, max: 300 }).withMessage('La clave es requerida y debe tener al menos 6 caracteres y como máximo 255 caracteres'),
    body('fecha_nacimiento').isDate({ format: 'YYYY-MM-DD' }).withMessage('La fecha de nacimiento debe tener el formato YYYY-MM-DD'),
    body('telefono').notEmpty().trim().customSanitizer(removeExtraSpaces).isLength({ min: 6, max: 20 }).withMessage('El teléfono es requerido y debe tener como máximo 20 caracteres'),
    body('direccion').notEmpty().trim().customSanitizer(removeExtraSpaces).isLength({ min: 6, max: 255 }).withMessage('La dirección es requerida y debe tener como máximo 255 caracteres').custom((value) => {
        if (containsProfanity(value)) {
            throw new Error('El nombre contiene palabras ofensivas');
        }
        return true;
    }),
    body('rol').isIn(['admin', 'usuario', 'moderador']).withMessage('El rol debe ser uno de los siguientes: admin, usuario, moderador'),
    body('estado').isIn(['activo', 'inactivo']).withMessage('El estado debe ser uno de los siguientes: activo, inactivo'),
];

// Middleware express-validator de validación específica para el ID en la actualización
const validarIdUpdate = [
    body('id').notEmpty().isInt({ min: 1 }).withMessage('El ID debe ser un número entero mayor que cero')
];
// Middleware express-validator de validación específica para el ID en la eliminación y consulta por ID
const validarId = [
    param('id').notEmpty().isInt({ min: 1 }).withMessage('El ID debe ser un número entero mayor que cero')
];

// Middleware de validación y manejo de errores centralizado
function validar(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Extraer solo los mensajes de error para un formato más limpio
        const errorMessages = errors.array().map(error => error.msg);
        return respuestas.error(req, res, errorMessages, 401, errors.array());
    }
    next();
}

// Rutas
router.get('/', verificarClaveAPI, obtenerTodos);
router.get('/:id', verificarClaveAPI, validarId, validar, obtenerPorId);
router.post('/save', verificarClaveAPI, validarUsuario, validar, agregar);
router.put('/update', verificarClaveAPI, validarUsuario, validarIdUpdate, validar, actualizar);
router.delete('/delete/:id', verificarClaveAPI, validarId, validar, eliminar);

// Funciones
async function obtenerTodos(req, res, next) {
    try {
        const items = await controlador.todos();
        respuestas.success(req, res, items, 200);
    } catch (error) {
        next(error);
    }
}

async function obtenerPorId(req, res, next) {
    try {
        const item = await controlador.obtenerPorId(req.params.id);
        respuestas.success(req, res, item, 200);
    } catch (error) {
        next(error);
    }
}

async function agregar(req, res, next) {
    try {
        // Encriptar la clave antes de agregar el usuario
        const claveEncriptada = encriptarClave(req.body.clave);
        req.body.clave = claveEncriptada;
        await controlador.agregar(req.body);
        respuestas.success(req, res, 'Se inserto correctamente el usuario', 200);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            respuestas.error(req, res, 'El correo electrónico ya existe o usario ya existe', 401, error);
        }
        next(error);
    }
}

async function actualizar(req, res, next) {
    try {
        // Encriptar la clave antes de agregar el usuario
        const claveEncriptada = encriptarClave(req.body.clave);
        req.body.clave = claveEncriptada;
        await controlador.actualizar(req.body);
        respuestas.success(req, res, 'Se actualizó correctamente el usuario', 200);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            respuestas.error(req, res, 'El correo electrónico ya existe o usario ya existe', 401, error);
        }
        next(error);
    }
}

async function eliminar(req, res, next) {
    try {
        await controlador.eliminar(req.params.id);
        respuestas.success(req, res, 'Se eliminó correctamente el usuario', 200);
    } catch (error) {
        next(error);
    }
}


module.exports = router;
