// servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');
const Sockets = require('./sockets');


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // http server
        this.server = http.createServer( this.app );

        //configuracion de sockets
        this.io = socketio( this.server, { /*configuraciones*/ });
    }

    middlewares() {
        // Desplegar el directorio publico
        this.app.use( express.static( path.resolve(__dirname, '../public')) );
        // Cors
        this.app.use(cors());
        
    }

    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar Sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port);
        });

    }

}

module.exports = Server;