function laser(spos, angle) {
  // laser_speed = 5;
  this.f = 0
  this.pos = createVector(spos.x, spos.y);
  this.heading = p5.Vector.fromAngle(angle);
  this.vel = createVector(this.heading.x * laser_speed, this.heading.y * laser_speed);
  this.init_frame = frameCount

  this.update = function () {
    this.pos.add(this.vel);
  }


  this.render = function () {
    push();
    // stroke(200);
    // strokeWeight(5);
    stroke(155, 0, 0);
    strokeWeight(8);
    point(this.pos.x, this.pos.y);
    pop();
    this.f++;

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

  this.hits = function (ast) {

    for (i = 0; i < ast.length; i++) {
      d = floor(dist(this.pos.x, this.pos.y, ast[i].pos.x, ast[i].pos.y))
      if (d < ast[i].r) {
        ast[i].hitted = true;
        // console.log("hit:"+i);
        return true;

      }
    }

    return false;

  }


}