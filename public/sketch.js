const socket = io.connect('http://localhost:3000');

const color = {
	white: 255,
	red: [255, 0, 0],
	blue: [0, 0, 255],
	green: [0,255, 0]
};

let colorState = {
	state: 'white'
};

const user = {
	topLeftx: 1500 - (window.innerWidth/2),
	topLefty: 1500 - (window.innerHeight/2),
	topRightx: 1500 + (window.innerWidth/2),
	topRighty: 1500 - (window.innerHeight/2),
	bottomLeftx: 1500 - (window.innerWidth/2),
	bottomLefty: 1500 + (window.innerHeight/2),
	bottomRightx: 1500 + (window.innerWidth/2),
	bottomRighty: 1500 + (window.innerHeight/2)
};

function preload(){
	testImage = loadImage('assets/testImage_LARGE.jpg');
}

function setup(){
	cursor(CROSS);
	pixelDensity(1); //Ensures that all displays show the same pixel density.
	const canvas = createCanvas(3000, 3000);
	canvas.parent('canvas-container');
	stroke(color.white);
	image(testImage, 0, 0);
}

socket.on('mouse', newDrawing); //Add other user's drawing data to the canvas.

function draw(){

}

// Send data every 1 seconds.
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
	stroke(color[data.altColor]);
	strokeWeight(5);
	line(data.px, data.py, data.x, data.y);
}

function mouseDragged(){
	strokeWeight(5);
	line(pmouseX, pmouseY, mouseX, mouseY);
	mouseDataSend();
}

function mouseDataSend() {
	if (mouseX!=pmouseX || mouseY!=pmouseY) {
		let data = {
			x: mouseX,
			y: mouseY,
			px: pmouseX,
			py: pmouseY,
			altColor: colorState.state
		};
		socket.emit('mouse', data);
	}
}

function keyPressed(event){
	if (event.key == 'r') {
		stroke(color.red);
		colorState.state = 'red';
	} else if (event.key == 'g') {
		stroke(color.green);
		colorState.state = 'green';
	} else if (event.key == 'b') {
		stroke(color.blue);
		colorState.state = 'blue';
	} else if (event.key == 'w') {
		stroke(color.white);
		colorState.state = 'white';
	}
}