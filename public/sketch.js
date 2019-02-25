const socket = io.connect('http://localhost:3000');

function preload(){
	masterImage = loadImage('assets/bac.jpg');
}

function setup(){
	cursor(CROSS);
	pixelDensity(1); //Ensures that all displays show the same pixel density.
	const canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('canvas-container');
}

socket.on('mouse', newDrawing); //Add other user's drawing data to the canvas.

function draw(){
	image(masterImage, 0, 0);
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
}, 1000);

function newDrawing(data) {
	masterImage.loadPixels();
	masterImage.set(data.x, data.y, 0);
	masterImage.updatePixels();
}

function mouseDragged(){
	masterImage.loadPixels();
	fill(255);
	noStroke();
	masterImage.set(mouseX, mouseY, 255);
	masterImage.updatePixels();
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