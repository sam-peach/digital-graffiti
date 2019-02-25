const express = require('express'); //import express
const socket = require('socket.io'); //import socket
const app = express(); // call the express library
const server = app.listen(3000); //local host on port 3000
const io = socket(server); //'io' is going to listen for input and output
const fs = require('fs');

app.use(express.static('public'));

io.sockets.on('connection', newConnection);

function newConnection(socket) {

	console.log("New connection: " + socket.id);
	socket.on('mouse', mouseMsg);
	socket.on('latestImg', updateMasterImg);

	socket.on('disconnect', function(){
		console.log('User disconnect:' + socket.id);
	});

	function mouseMsg(data){
		socket.broadcast.emit('mouse', data);
	}

	function updateMasterImg(data) {
	  console.log('Update being called:');
	  console.log(data);
	  if (data) {
	  	fs.writeFile('./public/assets/testImage.jpg', data, 'binary', function(err, data){
	  	  if (err) console.log(err);
	  	  console.log("Successfully Written to File.");
	  	});
	  }
	}

}

console.log("Server is running");
