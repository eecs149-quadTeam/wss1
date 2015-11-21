/** Web Socket server for communication between the Controller and the Kobuki accessors. */

var PORT = process.env.port || 3000;

var app = require('express')();
var io = require('socket.io')(PORT);

io.on('connection', function (socket) {
    console.log('New socket connected...');

    socket.on('message', function (msg) {
        console.log('Moving Kobuki to ' + msg + '...');

        io.emit('Received message: ' + msg);
    });
});
