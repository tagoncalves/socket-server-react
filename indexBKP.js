// Servidor de express
const express = require('express');
const app = express();

// Servidor de Sockets
const server = require('http').createServer(app);

//Configuracion del Socket Server
const io = require('socket.io')(server);

// Desplegar el directorio publico
app.use(express.static(__dirname + '/public'))

io.on('connection', ( socket ) => { 
    console.log(socket.id);

    socket.on('mensaje-to-server', (data) => {
        console.log(data);

        // emision local
        // socket.emit('mensaje-from-server', data );

        // emision global
        io.emit('mensaje-from-server', data );

    })

    // Emitir evento
    // socket.emit( 'mensaje-bienvenida', {
        //     msg: 'Bienvenido al server',
        //     fecha: new Date()
        // } );
    // Escuchar el evento
    // socket.on('mensaje-cliente', (data) => {
    //     console.log(data);
    // })

});

server.listen(8080, () => {
    console.log('corriendo');
});
