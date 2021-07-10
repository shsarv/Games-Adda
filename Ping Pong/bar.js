function bar(posx, posy) {


	if (posx) {
		this.y = posy
		this.x = posx
	} else {

		this.x = 0
		this.y = (height / 2);
	}

	this.width = bwidth;
	this.height = bheight;




	this.draw = function () {
		fill("white")
		rectMode(CENTER);


		rect(this.x, this.y, this.width, this.height)
	}

	this.update = function () {		//controls for player 1
		this.y = mouseY
	}




	this.PosCheck = function () {
		this.y = constrain(this.y, 0, height)
	}

	this.bot = function (ball) {		//controls for bot (automatic)

		
		ymul =random(1500,2000)/1000

		//+ve if ball is above midpoint of padlle
		//-ve if ball is below midpoint of padlle
		this.diff = this.y - ball.y;

		if ((this.diff) > this.height / 15) {
			rand = random(5000, 15000) / 10000		//random value bw 0.7 to 1.2 	 
			this.y -= abs(ball.yspeed) * rand
			// console.log(this.rand)httph
		} else if ((this.diff) < this.height / 15) {
			rand = random(5000, 15000) / 10000		//random value bw 0.7 to 1.2 	 
			this.y += abs(ball.yspeed) * rand
			// console.log(this.rand)
		}


		if (ball.xspeed > 10 && ball.xspeed < 15 && ball.yspeed > -4 && ball.yspeed < 4) {

			this.y += ball.xspeed * ymul
		}
		
		return this.diff;		//debugging

	}
}

