const express = require('express'); //import express
const socket = require('socket.io'); //import socket
const app = express(); // call the express library
const server = app.listen(3000); //local host on port 3000

const io = socket(server); //'io' is going to listen for input and output

app.use(express.static('public'));

io.sockets.on('connection', newConnection);

var masterImg=[];

function newConnection(socket) {
	console.log("new connection: " + socket.id);
	sendMasterImg(masterImg);
	socket.on('mouse', mouseMsg);
	socket.on('latestImg', updateMasterImg);

	function mouseMsg(data){
		socket.broadcast.emit('mouse', data);
		// console.log(data);
	}

	function sendMasterImg(data){
		socket.emit('masterImg', data);
	}

	function updateMasterImg(data) {
		masterImg =[];
		for (var i = 0; i < 1000000; i++) {
			// console.log(i);
			masterImg.push(data[i]);
		}
		console.log(masterImg.length);

	}

}


console.log("Server is running");
