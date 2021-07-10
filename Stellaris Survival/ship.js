function ship_o() {
  this.pos = createVector(width / 2, height / 2);
  this.r = 20;
  this.heading = 0;
  this.rotation = 0;
  this.isBoosting = false;
  this.crashed = false;
  this.d = []
  this.render = function () {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    // noFill();
    stroke(200);
    fill(0, 250, 0, 100)
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    ellipse(0, -this.r, 4, 4);
    pop();
  }
  this.animate = function () {
    // push();
    // translate(this.pos.x, this.pos.y);
    // rotate(this.heading + PI / 2);
    // fisll(255);
    // stroke(200);
    // strokeWeight(20)
    // // triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    // // ellipse(0, -this.r, 4, 4);
    // point(this.r,this.r+100)
    // pop();
    // console.log("cccccccc")
  }


  this.vel = createVector(1, 0)


  this.update = function () {
    if (this.isBoosting) {
      this.boost();
    }
    this.vel.limit(speed_limit);
    // console.log( this.vel);
    this.pos.add(this.vel)
    this.vel.mult(velocity_damp_factor);

    this.vel.x = parseFloat(this.vel.x.toFixed(decimal_limit))
    this.vel.y = parseFloat(this.vel.y.toFixed(decimal_limit))

    if (this.vel.x < 0.1 && this.vel.x > -0.1)
      this.vel.x = 0

    if (this.vel.y < 0.1 && this.vel.y > -0.1)
      this.vel.y = 0
  }

  this.boost = function (direction = 1) {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(froce_multiplier * direction);
    this.vel.add(force);
    // console.log("booost");
  }

  this.setRotation = function (a) {
    this.rotation = a;
  }

  this.turn = function () {
    this.heading += this.rotation;
  }

  this.boosting = function (b) {
    this.isBoosting = b;
  }

  this.crash = function (asteroids) {
    dis = [];
    temp_ast = asteroids;
    for (i = 0; i < temp_ast.length; i++) {
      dis[i] = floor(temp_ast[i].pos.dist(this.pos))
      if (debugging) {
        stroke(255)
        line(this.pos.x, this.pos.y, temp_ast[i].pos.x, temp_ast[i].pos.y)
        stroke(100)
        text(dis[i], (this.pos.x + temp_ast[i].pos.x) / 2 + 3, (this.pos.y + temp_ast[i].pos.y) / 2 + 3)
      }
      // console.log(i+"::"+d)
      if (dis[i] < (this.r / 2 + temp_ast[i].r)) {
        if (debugging)
          console.log("collison with :" + i)
        this.crashed = true;

      }
    }
  }

  this.edge = function () {
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }

}