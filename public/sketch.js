const socket = io.connect('http://localhost:3000');

const color = {
	white: 255,
	red: [255, 0, 0],
	blue: [0, 0, 255],
	green: [0,255, 0],
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
	const canvas = createCanvas(window.innerWidth, window.innerHeight);
	canvas.parent('canvas-container');
	stroke(color.white);
	userImage = createImage(windowWidth, windowHeight);
	testImage.loadPixels;
	userImage.loadPixels;
	for (var i = user.topLeftx ; i < user.topRightx ; i++) {
		for (var j = user.topLefty ; j < user.bottomLefty ; j++) {
			let x = i - user.topLeftx;
			let y = j - user.topLefty;
			var col = testImage.get(i, j);
			userImage.set(x, y, col);
		}
	}
	userImage.updatePixels();
	image(userImage, 0, 0);
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
}, 1000);

function newDrawing(data) {
	testImage.loadPixels();
	testImage.set(data.x, data.y, 0);
	testImage.updatePixels();
}

function mouseDragged(){
	// line(pmouseX, pmouseY, mouseX, mouseY);
	// testImage.loadPixels();
	strokeWeight(5);
	line(pmouseX, pmouseY, mouseX, mouseY);
	// fill(255);
	// noStroke();
	// testImage.set(mouseX, mouseY, 255);
	// testImage.updatePixels();
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