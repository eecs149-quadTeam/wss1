/** Web Socket server for communication between the Controller and the Kobuki accessors. */

var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/"));

var server = http.createServer(app);
server.listen(port);

console.log("HTTP server listening on %d...", port);

var wss = new WebSocketServer({server: server});
console.log("WebSocket server created...");

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
    });
};

wss.on("connection", function(ws) {
    console.log("New socket connected...");

    ws.on('message', function (msg) {
        var turn_amt = msg * 90;
        console.log('Turning Kobuki ' + turn_amt + ' degrees and moving forward 1 step...');

        wss.broadcast(msg);
    });
});