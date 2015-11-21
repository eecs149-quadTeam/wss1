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

wss.on("connection", function(ws) {
  console.log("New socket connected...");

  ws.on('message', function (msg) {
      console.log('Moving Kobuki to ' + msg + '...');

      ws.send('ACK: ' + msg);
  });
});