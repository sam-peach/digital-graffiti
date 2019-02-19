const socket = io.connect('http://localhost:3000');

function setup(){
	cursor(CROSS);
	pixelDensity(1); //Ensures that all displays show the same pixel density.
	const canvas = createCanvas(500, 500);
	canvas.parent('canvas-container');
	background(0);
	// socket.emit('masterImg', masterImg);
}

function draw(){
	socket.on('masterImg', drawMasterImage); //Keps checking for new data.
	socket.on('mouse', newDrawing); //Keps checking for new data.
	// loadPixels();
	// socket.emit('latestImg', pixels);
	// console.log(pixels.length);
}

function newDrawing(data) {
	stroke(255, 0, 100);
	line(data.x, data.y, data.px, data.py);
}

function drawMasterImage(data){
	// loadPixels()
	// for (var i = 0; i < pixel.length; i++) {
	// 	for (var i = 0; i < array.length; i++) {
	//
	// 	}
	// }
	// image(data, 0, 0);
}

function mouseDragged(){
	stroke(255);
	line(mouseX, mouseY, pmouseX, pmouseY);
	mouseDataSend();
}

function mouseDataSend() {
	if (mouseX!=pmouseX || mouseY!=pmouseY) {
		// console.log('Sending: ' + mouseX , mouseY, pmouseX, pmouseY);
		let data = {
			x: mouseX,
			y: mouseY,
			px: pmouseX,
			py: pmouseY
		}
		socket.emit('mouse', data);
	}
}

// If you press 'p' on your keyboard this function will save the canvas
// in its current state to a jpg in your downloads.
// This is what we'd want to send to the database.
function keyPressed(event) {
	if (event.key == 'p') {
		console.log('P pressed');
		loadPixels();
		let img = createImage(500, 500);
		img.loadPixels();
		for (let i = 0; i < img.width; i++) {
		  for (let j = 0; j < img.height; j++) {
		    // img.set(i, j, color(0, 90, 102));
				var index = (i + j * 500) * 4;
				img.pixels[index] = pixels[index];
				img.pixels[index+1] = pixels[index+1];
				img.pixels[index+2] = pixels[index+2];
				img.pixels[index+3] = pixels[index+3];
		  }
		}
		img.updatePixels();
		updatePixels();
		img.save('canvas', 'jpg');

	}
}
