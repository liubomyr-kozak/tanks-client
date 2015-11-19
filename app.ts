declare function require(name:string);

var express = require('express');
var http = require('http');
var socketio = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketio(server);

server.listen('8080', () => {
	console.log('listening');
});

app.use(express.static('public'));

io.on('connection', (socket) => {
});