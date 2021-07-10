function snake() {
	this.x=0
	this.y=0
	this.xspeed = 1;
	this.yspeed = 0;
	this.bitted=false;
	this.wallHit=false;

	this.tail = [];


	this.bite=function(){
		pos=createVector(this.x,this.y)
		for(i=0;i<this.tail.length;i++){
			
			d=floor(this.tail[i].dist(pos))
			if(d<scl){
				this.bitted=true;
				console.log("bitted "+i+" th part::"+d)
			}
		}
	}
	this.dir = function (x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}



	this.update = function () {

		this.x = this.x + this.xspeed * scl;
		this.y = this.y + this.yspeed * scl;
	
	}


	
	this.wall=function(){
		if(walls){
			if(this.x<0||this.y<0||this.x+scl>width||this.y+scl>height){
				this.wallHit=true;
			}

		}else{
			if(this.x+scl>width){
				this.x=0
			}else if(this.x<0){
				this.x=width
			}
			if(this.y+scl>height){
				this.y=0
			}else if(this.y<0){
				this.y=height
			}
		}
	}


	this.show = function () {
		fill(255, 0, 100,100);
		for (var i =0; i <this.tail.length; i++) {
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}
		fill(255)
		rect(this.x, this.y, scl, scl);
	}

	this.updateTail=function(){
		
		for(i = this.tail.length-1; i >=0; i--){
			if(i==0){
				this.tail[i]=createVector(this.x,this.y)
			}else{
			this.tail[i]=this.tail[i-1]
			}
			
			
		}
		
	}



	this.eat = function (food) {

		var d = dist(this.x, this.y, food.x, food.y)
		if (d < scl) {
			temp=createVector(this.x,this.y)
			this.tail.push(temp)
			// console.log("tail ddded")

			return true;
		} else {
			return false;
		}

	}
	}
