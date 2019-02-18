const socket = io.connect('http://localhost:3000');

function setup(){
	cursor(CROSS);
	const canvas = createCanvas(500, 500);
	canvas.parent('canvas-container');
	background(100);
	socket.on('mouse', newDrawing);
}

function draw(){
}

function newDrawing(data) {
	stroke(255, 0, 100);
	line(data.x, data.y, data.px, data.py);
}

function mouseDragged(){
	stroke(255);
	line(mouseX, mouseY, pmouseX, pmouseY);
	mouseDataSend();
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
