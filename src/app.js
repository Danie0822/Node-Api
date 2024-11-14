// Dependencias  
const express = require('express'); 
const morgan = require('morgan');
const config = require('./config'); 
const app = express(); 
const error = require('./red/errors'); 
const helmet = require('helmet'); // Helmet para seguridad

// Archivos de rutas
const usuario = require('./modulos/usuario/rutas');  

// Middleware
app.use(morgan('dev'));  // para logs
app.use(express.json()); // para recibir json

// Helmet para seguridad 
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(helmet.referrerPolicy({ policy: "same-origin" }));

// Configuración del puerto
app.set('port', config.app.port);

// Rutas
app.use('/api/usuario', usuario);
// Manejo de errores
app.use(error); 

module.exports = app;
