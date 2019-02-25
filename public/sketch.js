const socket = io.connect('http://localhost:3000');

const color = {
	white: 255,
	red: [255, 0, 0],
	blue: [0, 0, 255],
	green: [0,255, 0],
};

function preload(){
	testImage = loadImage('assets/testImage.jpg');
}

function setup(){
	cursor(CROSS);
	pixelDensity(1); //Ensures that all displays show the same pixel density.
	const canvas = createCanvas(500, 500);
	canvas.parent('canvas-container');
	image(testImage, 0, 0);
	stroke(color.white);
}

socket.on('mouse', newDrawing); //Add other user's drawing data to the canvas.

function draw(){
	
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
	testImage.loadPixels();
	testImage.set(data.x, data.y, 0);
	testImage.updatePixels();
}

function mouseDragged(){
	line(pmouseX, pmouseY, mouseX, mouseY);
	testImage.loadPixels();
	strokeWeight(5);
	line(pmouseX, pmouseY, mouseX, mouseY);
	// fill(255);
	// noStroke();
	// testImage.set(mouseX, mouseY, 255);
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

function keyPressed(event){
	if (event.key == 'r') {
		stroke(color.red);
	} else if (event.key == 'g') {
		stroke(color.green);
	} else if (event.key == 'b') {
		stroke(color.blue);
	} else if (event.key == 'w') {
		stroke(color.white);
	}
}