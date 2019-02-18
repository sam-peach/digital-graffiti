const socket = io.connect('http://localhost:3000');

function setup(){
	const canvas = createCanvas(500, 500);
	canvas.parent('canvas-container');
	background(100);
	socket.on('mouse', newDrawing);	
}

function draw(){
	noStroke();
	fill(255);
	ellipse(mouseX, mouseY, 40, 40);
	mouseDataSend(mouseX, mouseY);
}

function newDrawing(data) {
	noStroke;
	fill(255, 0, 100);
	ellipse(data.x, data.y, 40, 40);
}

function mouseDataSend(argX, argY) {
	if (argX!=pmouseX || argY!=pmouseY) {
		console.log('Sending: ' + mouseX , mouseY);
		let data = {
			x: argX,
			y: argY
		}
		socket.emit('mouse', data);
	}
}