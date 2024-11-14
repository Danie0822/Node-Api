const db = require('../../servicios/mysql'); 
const ctrl = require('./controlador'); 

module.exports = ctrl(db); 