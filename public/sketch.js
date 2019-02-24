const socket = io.connect('http://localhost:3000');

function preload(){
	testImage = loadImage('assets/testImage.jpg');
}

function setup(){
	cursor(CROSS);
	pixelDensity(1); //Ensures that all displays show the same pixel density.
	const canvas = createCanvas(500, 500);
	canvas.parent('canvas-container');
	// image(testImage, 0, 0);
}

function draw(){
	image(testImage, 0, 0);
	socket.on('mouse', newDrawing); //Keps checking for new data.
	if (frameCount%90==0) {
		console.log('Interval run');
		const canvas = document.getElementById('defaultCanvas0');
	 console.log("CANVAS: ", canvas);
	 if (canvas) {
		 canvas.toBlob(function(blob) {
			 url = URL.createObjectURL(blob);
			 socket.emit('latestImg', url);
			 });
		}
	}
}

function drawImage(){}

// Send data every 3 seconds.
// setTimeout(()=>{
// 	console.log('Timeout run');
// 	setInterval(()=>{
// 		console.log('Interval run');
// 		const canvas = document.getElementById('defaultCanvas0');
// 	 console.log("CANVAS: ", canvas);
// 	 if (canvas) {
// 		 canvas.toBlob(function(blob) {
// 			 url = URL.createObjectURL(blob);
// 			 socket.emit('latestImg', url);
// 			 });
// 	 }
//  }, 3000);
// }, 5000);

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
	testImage.loadPixels();
	// stroke(255);
	fill(255);
	noStroke();
	// line(mouseX, mouseY, pmouseX, pmouseY);
	// ellipse(mouseX, mouseY, 50, 50);
	testImage.set(mouseX, mouseY, 255);

	testImage.updatePixels();

	mouseDataSend();
	console.log('drawing');
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
