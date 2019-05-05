const express = require('express');
const app = express();

//Create Server
const server = app.listen(3000, () => {
	console.log('server is ready on port 3000');
});

const socket = require('socket.io');
const io = socket(server);

io.on('connection', (socket) => {
	socket.on('chat', (data) => {
		io.sockets.emit('chat', data);		
	});

	socket.on('typing', (data) => {
		socket.broadcast.emit('typing', data);
	})
});


