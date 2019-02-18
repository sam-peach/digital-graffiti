const express = require('express'); //import express
const socket = require('socket.io'); //import socket
const app = express(); // call the express library
const server = app.listen(3000); //local host on port 3000

const io = socket(server); //'io' is going to listen for input and output

app.use(express.static('public'));

io.sockets.on('connection', newConnection);

function newConnection(socket) {
	console.log("new connection: " + socket.id);

	socket.on('mouse', mouseMsg);

	function mouseMsg(data){
		socket.broadcast.emit('mouse', data);
		console.log(data);
	}

}


console.log("Server is running");