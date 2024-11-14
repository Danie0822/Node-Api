// Variables seguras desde un archivo .env 
require('dotenv').config();

module.exports = {
    //  Variables exportadas para el puerto
    app: {
        port: process.env.PORT ,
    }, 
    // Variables exportadas para la conexion 
    mysql:{
        host: process.env.MYSQL_HOST, 
        user: process.env.MYSQL_USER, 
        password: process.env.MYSQL_PASSWORD, 
        database: process.env.MYSQL_DB ,
        charset: process.env.CHARSET, 
        port: process.env.MYSQL_PORT
    },
    apiKey: process.env.API_KEY
    

}
