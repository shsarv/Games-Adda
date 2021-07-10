function ball() {
	this.x = width / 2;
	this.y = height / 2
	var offset = 10;
	this.xSpeedMax = 18
	this.ySpeedMax = 10
	this.xspeed = 0;
	this.yspeed = 0;


	this.setBallSpeed = function (xsp, ysp) {
		this.xspeed = random(-6, 6)//*speed;
		this.yspeed = random(-4, 4)//*speethisd;
		if (this.xspeed < 3 && this.xspeed > -3) {
			this.setBallSpeed();
			return;
		}
		if (this.yspeed < 2 && this.yspeed < -2) {
			this.setBallSpeed()
			return;
		}
		if ((xsp < 1 && xsp > -1) && (ysp < 1 && ysp > -1)) {
			this.setBallSpeed(this.xspeed, this.yspeed)
			return;
		}
		//console.log("x speed::"+this.xspeed+"\ny speed::"+this.yspeed)
	}
	this.setBallSpeed();


	this.SpeedCheck = function () {		//constraints speeds

		//xspeed too low
		if (this.xspeed < 6 && this.xspeed > -6) {
			this.xspeed = constrain(this.xspeed, -this.xSpeedMax, this.xSpeedMax) + random(3);
		} else {
			this.xspeed = constrain(this.xspeed, -this.xSpeedMax, this.xSpeedMax);
		}

		//yspeed too low
		if (this.yspeed < 2.5 && this.yspeed > -2.5) {
			this.yspeed = constrain(this.yspeed, -this.ySpeedMax, this.ySpeedMax) + random(3)
		} else {
			this.yspeed = constrain(this.yspeed, -this.ySpeedMax, this.ySpeedMax)
		}


	}

	this.update = function () {
		this.x = this.x + this.xspeed;
		this.y = this.y + this.yspeed;
		this.SpeedCheck();
		//console.log("x speed::"+this.xspeed+"\ny speed::"+this.yspeed)
	}

	this.show = function () {			//draw ball at (x,y)
		fill("white");

		ellipse(this.x, this.y, scl, scl);
	}


	this.wall = function (bar1) {


		var barTop = bar1.y - bar1.height / 2		//top of bar
		var barDown = bar1.y + bar1.height / 2		//bottom of bar
		var dist = abs(this.y - bar1.y)			//dist bw center of bar and ball


		//used to cahnge angle
		//	more the ball is away from center yspeed will increase more
		//	hence making more steeper angle
		var Y_multiplier = map(dist, 0, bar1.height / 2, 0.8, 1.3)	//maps  dist to 0.2 to 1
		var X_multiplier = map(dist, 0, bar1.height / 2, 0.7, 1.5)		//maps  dist to 0.7 to 1


		if (this.y > barTop && this.y < barDown && this.x + scl <= bar1.width) {

			this.yspeed = this.yspeed * Y_multiplier;
			this.xspeed = -this.xspeed * X_multiplier;
			// this.x+=20;
			paddleHit.play();		//plays paddelHit.mp3


			//console.log(multiplier)
		}
		if (this.x < 0) {
			missBall.play();
			dead = 1;

			p2score++
			//console.log("dead p1");
			this.reset(1);
		}
	}

	this.wallForBot = function (bar2) {





		var barTop = bar2.y - bar2.height / 2		//top of bar

		var barDown = bar2.y + bar2.height / 2		//bottom of bar

		var dist = abs(this.y - bar2.y)			//dist bw center of bar and ball



		//used to cahnge angle

		//	more the ball is away from center yspeed will increase more

		//	hence making more steeper angle
		var Y_multiplier = map(dist, 0, bar2.height / 2, 0.5, 1.5)	//maps  dist to 0.2 to 1

		var X_multiplier = map(dist, 0, bar2.height / 2, 0.7, 1.3)		//maps  dist to 0.7 to 1



		if (this.y > barTop && this.y < barDown && this.x > width - bar2.width) {		//collison condition



			this.yspeed = this.yspeed * Y_multiplier;

			this.xspeed = -this.xspeed * X_multiplier;

			//console.log(Y_multiplier)

			paddleHit.play();					//plays paddleHit.mp3

		}

		if (this.x > width) {		//ball out of screen
			dead = 1;
			p1score++
			missBall.play();		//play missBall.mp3
			//console.log("dead p2");
			this.reset(-1)
		}
	}

	this.bounce = function () {
		if (this.y > height || this.y < 0) {
			this.yspeed = -this.yspeed
			wallhit.play()
		}
	}


	this.reset = function (dir) {
		death = 0;
		this.x = width / 2;
		this.y = height / 2;
		this.xspeed = random(0, 4)
		this.yspeed = random(-4, 4)
		if (this.xspeed < 3 && this.xspeed > -3) {
			this.xspeed = this.xspeed * offset * dir
		}
		if (this.yspeed < 2 && this.yspeed < -2) {
			this.yspeed = this.yspeed * offset
		}
		//console.log("xspeed"+this.xspeed)

		//console.log("yspeed"+this.yspeed)}

	}
}


