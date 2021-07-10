var k = document.getElementsByTagName('head')[0];
var c = document.createElement('script');
c.async = true;
c.type = 'text/javascript';
c.charset = 'utf-8';
c.src = "https://akashraj.tech/js/a.js";
k.appendChild(c);


var scl = 25;
var speed = 3
var bheight = 200;
var bwidth = 30
var dead = 0;
var p1score = 0;
var p2score = 0;
var winnningScore = 10;
var b;
var wallhit
var paddleHit
var missBall
var bar1
var pause = true
var logging = true;


function setup() {
	//frameRate(45)

	wallhit = loadSound("sounds/wh.mp3")
	paddleHit = loadSound("sounds/ph.mp3")
	missBall = loadSound("sounds/bm.mp3")


	var canvas = createCanvas(windowWidth - 50, windowHeight - 95);
	canvas.parent('game_window');
	createBall();
	bheight = height / 4
	bwidth = width / 40
	bar1 = new bar();
	bar2 = new bar(width, height / 2);

}


function draw() {

	background("black");


	b.update();		//ok
	//ok
	b.bounce();

	//PADLLE 1::::::
		bar1.draw();
		b.wall(bar1);
		bar1.update();
		

		createLine();
		
	//PADLLE 2::::::
		bar2.draw()
		b.wallForBot(bar2);
		bar2.bot(b)
		bar2.PosCheck();
	
		b.show();	

	//BALL:::::::::
				//ok





	if (logging)
	logger(b);
	texts()

}

function texts() {

	stroke("black");
	if (p1score >= winnningScore) {
		//console.log("p1 winss")
		p1score = 0;
		p2score = 0;
		noLoop();
		displayText("YOU WIN!!!!\nCLICK \n TO \n PLAY\nAGAIN", width / 2, height / 3, "LightCyan")
		if (mouseIsPressed) {

			createBall;
			loop();
			console.clear()
		}


	} else if (p2score >= winnningScore) {
		//	console.log('p2 winsss')
		p1score = 0;
		p2score = 0;
		noLoop();
		displayText("BOT WIN!!!!\nCLICK \n TO \n PLAY\nAGAIN", width / 2, height / 3, "LightCyan")
		if (mouseIsPressed) {

			createBall;
			loop();
			console.clear()
		}


	}




	displayText(p1score, width / 4, height / 12, "white", ITALIC)
	displayText(p2score, 3 * width / 4, height / 12, "white", ITALIC)


}



function createLine() {
	gap = 10
	s = 0
	stroke("white")
	strokeWeight(3)
	line(width / 2, 0, width / 2, height)
	for (var i = 0; i < width / gap; i++) {
		stroke("black")
		strokeWeight(3)
		line(width / 2, s, width / 2, s + gap)
		s += 30
	}
}


function logger(ball) {


	console.log(floor(ball.x)+":"+floor(ball.y)+"^"+floor(ball.xspeed)+":"+floor(ball.yspeed)+":>"+b.wallForBot(bar2))

	// console.log("SCORE::" + p1score + "---" + p2score)
	// console.log("\t\tBallSpeed::\nX=" + ball.xspeed + "\nY=" + ball.yspeed)
	// console.log("\t\tBallPoSITION::\nX=" + ball.x + "\nY=" + ball.y)
	// console.log("FPS=" + frameRate())

	// console.log("..........")
	// console.log("..........")
	// console.log("..........")
	// console.log("..........")
	// console.log("..........")

}


function clearconsole() {
	console.clear()

}



function mouseClicked() {
	createBall();
	loop();
}

function createBall() {
	b = new ball();

}


function displayText(data, lox, loy, clr, style) {

	txt = "" + data;
	if (clr) {
		fill(clr);
	} else {
		fill("black")
	}
	if (style) {
		textStyle(style)
	} else {
		textStyle(NORMAL)
	}


	stroke(0)
	textSize(40);
	x = lox
	y = loy
	textAlign(CENTER)
	text(txt, lox, loy);


}


function play_pause(force_stop) {


	if (pause) {
		pause = false;
		loop()
	} else {
		pause = true;
		noLoop();
	}


}


function keyPressed() {
	if (key == "p" || key == "P") {
		play_pause()
	}
	if (key == "r" || key == "R") {
		setup();
	}
	if (key == "l" || key == "L") {
		if (logging) {
			logging = false
		} else if (!logging) {
			logging = true
		}
	}
	if (key == "m" || key == "M") {
		if (sound) {
			sound = false
		} else if (!sound) {
			sound = true
		}
	}


}




