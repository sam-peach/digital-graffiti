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

function sketch(p){
	p.setup = function(){
		p.cursor(CROSS);
		p.pixelDensity(1); //Ensures that all displays show the same pixel density.
		const canvas = p.createCanvas(500, 500);
		p.background(100);
		canvas.parent('canvas-container');
		p.stroke(color.white);
	}

	p.draw = function(){
 		p.stroke(color[colorState.state]);	
	}

	p.mouseDragged = function(){
		p.strokeWeight(5);
		p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
		mouseDataSend();
	}

	p.keyPressed = function(event){
		if (event.key == 'r') {
			p.stroke(color.red);
			colorState.state = 'red';
		} else if (event.key == 'g') {
			p.stroke(color.green);
			colorState.state = 'green';
		} else if (event.key == 'b') {
			p.stroke(color.blue);
			colorState.state = 'blue';
		} else if (event.key == 'w') {
			p.stroke(color.white);
			colorState.state = 'white';
		}
	}
}

const newCanvas = new p5(sketch);
const newCanvas_2 = new p5(sketch);
const newCanvas3 = new p5(sketch);
const newCanvas4 = new p5(sketch);


// const user = {
// 	topLeftx: 1500 - (window.innerWidth/2),
// 	topLefty: 1500 - (window.innerHeight/2),
// 	topRightx: 1500 + (window.innerWidth/2),
// 	topRighty: 1500 - (window.innerHeight/2),
// 	bottomLeftx: 1500 - (window.innerWidth/2),
// 	bottomLefty: 1500 + (window.innerHeight/2),
// 	bottomRightx: 1500 + (window.innerWidth/2),
// 	bottomRighty: 1500 + (window.innerHeight/2)
// };

function preload(){
	// testImage = loadImage('assets/testImage_LARGE.jpg');
}



socket.on('mouse', newDrawing); //Add other user's drawing data to the canvas.

function draw(){
}

// Send data every 1 seconds.
// setInterval(()=>{
// 	const canvas = document.getElementById('defaultCanvas0');
// 	if (canvas) {
// 		canvas.toBlob(function(blob) {
// 		url = URL.createObjectURL(blob);
// 		socket.emit('latestImg', blob);
// 		});
// 	}
// }, 3000);

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

const canvasMaster = {
	size: 144
}

class User{
	constructor(windowWidth, windowHeight){
		this.windowWidth = windowWidth;
		this.windowHeight = windowHeight;
	}

	canvasHelper(){
		const userArea = this.windowWidth * this.windowHeight;
		return userArea / Math.pow(canvasMaster.size);

	}
}

class Canvas {
	constructor(size) {
		this.width = size;
		this.height = size; 
	}
}

// const newUser = new User(window.innerWidth, window.outerWidth);

// console.log(newUser);