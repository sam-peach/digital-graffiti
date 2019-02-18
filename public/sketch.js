const socket = io.connect('http://localhost:3000');

function setup(){
<<<<<<< HEAD
	createCanvas(1000, 700);
=======
	const canvas = createCanvas(500, 500);
	canvas.parent('canvas-container');
>>>>>>> e565f2c0cfe6af105a3481530a9397f75726ad4b
	background(100);
	socket.on('mouse', newDrawing);	
}

function draw(){
	stroke(255);
	fill(255);
	line(mouseX, mouseY, pmouseX, pmouseY);
	mouseDataSend();
}

function newDrawing(data) {
	stroke(255, 0, 100);
	console.log(data);
	line(data.x, data.y, data.px, data.py);
}

function mouseDataSend() {
	if (mouseX!=pmouseX || mouseY!=pmouseY) {
		console.log('Sending: ' + mouseX , mouseY, pmouseX, pmouseY);
		let data = {
			x: mouseX,
			y: mouseY,
			px: pmouseX,
			py: pmouseY
		}
		socket.emit('mouse', data);
	}
}