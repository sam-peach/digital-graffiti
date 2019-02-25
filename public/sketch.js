const socket = io.connect('http://localhost:3000');

function preload(){
	testImage = loadImage('assets/testImage.jpg');
}

function setup(){
	cursor(CROSS);
	pixelDensity(1); //Ensures that all displays show the same pixel density.
	const canvas = createCanvas(500, 500);
	canvas.parent('canvas-container');
}

socket.on('mouse', newDrawing); //Add other user's drawing data to the canvas.

function draw(){
	image(testImage, 0, 0);
}


// Send data every 3 seconds.
setInterval(()=>{
	const canvas = document.getElementById('defaultCanvas0');
	if (canvas) {
		canvas.toBlob(function(blob) {
		url = URL.createObjectURL(blob);
		socket.emit('latestImg', blob);
		});
	}
}, 3000);

function newDrawing(data) {
	testImage.loadPixels();
	testImage.set(data.x, data.y, 0);
	testImage.updatePixels();
}

function mouseDragged(){
	testImage.loadPixels();
	fill(255);
	noStroke();
	testImage.set(mouseX, mouseY, 255);
	testImage.updatePixels();
	mouseDataSend();
}

function mouseDataSend() {
	if (mouseX!=pmouseX || mouseY!=pmouseY) {
		let data = {
			x: mouseX,
			y: mouseY,
			px: pmouseX,
			py: pmouseY
		}
		socket.emit('mouse', data);
	}
}