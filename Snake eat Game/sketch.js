var k = document.getElementsByTagName('head')[0];
var c = document.createElement('script');
c.async = true;
c.type = 'text/javascript';
c.charset = 'utf-8';
c.src = "https://akashraj.tech/js/a.js";
k.appendChild(c);

/* game container */
// c=document.createElement("div");
// c.id("game-container");
// d=crea
/* GAME variables*/
var scl = 40;
var food;
var s;
var walls = false
var score = 0
var pause = true;
var w;
var h;
var difficulty = 0.5;
/* GAME variables*/

/*speech rec variables*/

var recognition_available

var myRec

var most_recent_word
/*speech rec variables*/
function init_speech_rec() {
/*Speech recognition*/
if ('webkitSpeechRecognition' in window) {
recognition_available = true;
walls=false;

myRec = new p5.SpeechRec('en-US', parseResult);
myRec.continuous = true;
myRec.interimResults = true;



myRec.onEnd = function () {
	console.log('~~~~~~~~~~~')
	console.log('Speech recognition service disconnected');

	// if(!pause)
	if (!s.bitted && !s.wallHit) {
		console.log('restarting service.......')
		console.log('~~~~~~~~~~~')

		myRec.start()
	}
}

myRec.onStart = function () {
	console.log('------------------')
	console.log('Speech recognition service started');
	console.log('------------------')
}

myRec.onError = function () {
	console.log('*****************')
	console.log('Unexpected Error!!');
	console.log('*****************')
}

myRec.start()
}
else {
recognition_available = false;
walls=true;

}
/*Speech recognition*/

}


function setup() {
scl = floor(windowHeight / 15)
w = floor((windowWidth - scl) / scl) * scl
h = floor((windowHeight - scl) / scl) * scl
canvas = createCanvas(w, h);
canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2)
canvas.id("game")
canvas.parent("game-container")
s = new snake();
frameRate(10 * difficulty);

pickLocation();

//Start speech recognition
init_speech_rec();

}

function draw() {
background(51);

renderSnake()
renderFood()
renderTexts()



}

function renderSnake() {
s.wall()
s.show();
s.updateTail()

s.update();
s.bite()


}

function renderFood() {
if (s.eat(food)) {
score += difficulty * 10
pickLocation();
}
fill(100, 200, 100,120 );
rect(food.x, food.y, scl, scl);
}

function pickLocation() {
var cols = floor(width / scl);
var rows = floor(height / scl);
food = createVector(floor(random(cols)), floor(random(rows)));
food.mult(scl);
}

function play_pause() {
if(!s.bitted && !s.wallHit){
if (pause) {
pause = false;
loop()
} else if (!pause) {
pause = true;

noLoop();
}
}

}
function renderTexts() {
textAlign(CENTER)

textSize(20)
fill(27, 225, 124, 140)
text("score:" + score.toFixed(2), width / 5, height / 20)


if(walls){
	textAlign(RIGHT)
	textSize(15)
	fill(255,0,0)
	text("walls:on", width, 130)
}else{
	textAlign(RIGHT)
	textSize(15)
	fill(0,255, 0)
	text("walls:off", width, 130)
}
if (pause) {
textAlign(LEFT)
textSize(15)
fill(255)
text("II PAUSED", width / 10, height / 7)

textSize(15)
fill(0,255,0,150)
text("COMMANDS", width /10, height / 7+20)
textSize(15)
fill(0,255,255,150)
L="LEFT: moves snake left"
R="RIGHT: moves snake left"
U="UP: moves snake left"
D="DOWN: moves snake left"
STO="STOP: pause the game"
STA="START: resume the game"
FAS="FAST: speeds up the game /difficulty increases"
SLO="SLOW: slow down the game /difficulty decreases"
RES="RESET: resets the game"
REL="RELOAD: reloads the webpage"

str= L+"\n"+R+"\n"+U+"\n"+D+"\n"+STO+"\n"+STA+"\n"+FAS+"\n"+SLO+"\n"+RES+"\n"+REL;
text(str, width / 10, height / 5)

textSize(50)
textAlign(CENTER)
fill(255,100,50,120)
if(!s.bitted && !s.wallHit)
text("press 'P' or say \"start\" to play game",width/2,height/1.5)
else
text("press 'x' or say \"reset\" to restart game",width/2,height/1.5)
noLoop()
}

textSize(30)
fill(255)
if (s.bitted) {
text("don't hurt yourslef!! :P\npress x to play again", width / 2, height / 3)
pause = true;
}

textSize(20)
fill(255)
if (s.wallHit) {
text("you banged your head on wall LOL!\n be carefull \n press x to play again", width / 2, height / 5)
pause = true
}


if (recognition_available) {


push()
textSize(40)
textAlign(CENTER)
fill(0, 250, 0, 255 - frameCount * 20)
text("VOICE RECOGNITION  \n AVAILABLE", width / 2, 40)

textSize(20)
textAlign(LEFT)
fill(255, 255, 255)
text("commands available:: LEFT \t RIGHT \t UP \t DOWN \t STOP \t START \t FAST \t SLOW \t RESET \t RELOAD", 10, height - 10)


textAlign(RIGHT)
fill(0, 255, 0, 90)
textSize(30)
text("COMAAND: \n" + most_recent_word + "  ", width, 40)

fill(255, 100, 0,100)
text("Difficulty:" + difficulty.toFixed(2)+ "  ", width, 110)
pop()
} else {
push()
textSize(40)
textAlign(CENTER)
fill(255, 0, 0, 255 - frameCount * 10)
text("VOICE RECOGNITION \n NOT \n AVAILABLE", width / 2, 40)
pop()
}

}

function reset() {
s.x = 0
s.y = 0
s.tail.splice(0, s.tail.length)
score = 0
s.wallHit = false
s.bitted = false
s.dir(1, 0)
pause = false
loop()
}

function keyPressed() {
if (keyCode === UP_ARROW || key == "W" || key == "w") {
s.dir(0, -1)
} else if (keyCode === DOWN_ARROW || key == "S" || key == "s") {
s.dir(0, 1)
} else if (keyCode === RIGHT_ARROW || key == "D" || key == "d") {
s.dir(1, 0)
} else if (keyCode === LEFT_ARROW || key == "A" || key == "a") {
s.dir(-1, 0)
} else if (key == "p" || key == "P") {
play_pause()
} else if ((s.bitted || s.wallHit) && (key == "x" || key == "X")) {
reset()

}

}


//////////SPEECH RECOGNITION COMMANDS////////////////
function parseResult() {

// console.log(myRec.resultString)
most_recent_word = myRec.resultString.split(' ').pop()
var confidence = myRec.resultConfidence;

// console.log(most_recent_word + "  conficence::  " + confidence)
if (most_recent_word.indexOf("left") !== -1) {
s.dir(-1, 0)
// console.log(dx)
}
else

if (most_recent_word.indexOf("right") !== -1) {
	s.dir(1, 0)
	// console.log(dx)
}


if (most_recent_word.indexOf("up") !== -1) {
s.dir(0, -1)
// console.log(dy)
}
else

if (most_recent_word.indexOf("down") !== -1) {
	s.dir(0, 1)
	// console.log(dy)
}


if (most_recent_word.indexOf("stop") !== -1) {
pause = true;
noLoop();
}
else
if (most_recent_word.indexOf("start") !== -1) {
	pause = false
	loop()
}
else
	if (most_recent_word.indexOf("reset") !== -1) {
		reset()
	}
	else
		if (most_recent_word.indexOf("reload") !== -1) {
			location.reload()
		}

if (most_recent_word.indexOf("fast") !== -1) {
difficulty *= 1.2;
frameRate(10 * difficulty);
// console.log(difficulty)
} else

if (most_recent_word.indexOf("slow") !== -1) {
	difficulty *= 0.8
	frameRate(10 * difficulty);
	// console.log(difficulty)
}



}
