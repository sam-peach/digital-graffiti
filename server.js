const express = require('express'); //import express
const socket = require('socket.io'); //import socket
const app = express(); // call the express library
const PORT = 3000;
const server = app.listen(PORT, ()=>{
	console.log(`Server is now listening on port ${PORT}!`)
})
const io = socket(server); //'io' is going to listen for input and output
const fs = require('fs');

app.use(express.static('public'));

io.sockets.on('connection', newConnection);

function newConnection(socket) {
	socket.on('mouse', mouseMsg);
	socket.on('latestImg', updateMasterImg);
	socket.on('disconnect', function(){
		console.log('User disconnect:' + socket.id);
	});

	function mouseMsg(data){
		socket.broadcast.emit('mouse', data);
	}

	function updateMasterImg(data) {
		try {
			if (data) {
				fs.writeFile('./public/assets/testImage.jpg', data, 'binary', function(err){
					if(err)console.log(err)
				})
			}
		}
		catch(error) {
			console.log("SERVER ERROR: ", error)
		}
	}
}
