function asteroid(posn, rad) {


  this.pos = createVector()
  this.col = color(random(50, 200))
  this.setPos = function () {
    this.pos = createVector(random(width), random(height));
  }

  if (posn) {
    this.pos.x = posn.x;
    this.pos.y = posn.y;
  } else {
    this.setPos();
  }
  if (rad) {
    this.r = rad

  } else {
    this.r = random(20, 80);
  }


  this.total = floor(random(5, 20));
  this.offset = [];
  this.vel = p5.Vector.random2D();
  this.hitted = false;
  this.clash = true;


  for (var i = 0; i < this.total; i++) {
    this.offset[i] = random(this.r)
  }
  push();
  this.render = function () {

    beginShape();
    push();
    // stroke(3000);
    // noFill();
    fill(this.col)
    translate(this.pos.x, this.pos.y)
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, 2 * PI)
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  this.update = function () {
    this.pos.add(this.vel);
  }

  this.edge = function () {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    } else if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }


  this.breakup = function () {
    var newA = []
    newA[0] = new asteroid(this.pos, this.r)
  }
}