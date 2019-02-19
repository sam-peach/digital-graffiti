const express = require('express'); //import express
const socket = require('socket.io'); //import socket
const app = express(); // call the express library
const server = app.listen(3000); //local host on port 3000

const io = socket(server); //'io' is going to listen for input and output

app.use(express.static('public'));

io.sockets.on('connection', newConnection);

var masterImg=[];

function newConnection(socket) {
	console.log("New connection: " + socket.id);
	sendMasterImg(masterImg);
	socket.on('mouse', mouseMsg);
	socket.on('latestImg', updateMasterImg);
	socket.on('disconnect', function(){
		console.log('User disconnect:' + socket.id);
	});
	function mouseMsg(data){
		socket.broadcast.emit('mouse', data);
		// console.log(data);
	}

	function sendMasterImg(data){
		socket.emit('masterImg', data);
	}

	function updateMasterImg(data) {

	}

}


console.log("Server is running");
