for(var i=0;i<asteroids.length;i++){
  asteroids[i].render();
  asteroids[i].update();
  asteroids[i].edge();
}

for(var i=lasers.length-1;i>=0;i--){
  lasers[i].render();
  lasers[i].update();
  lasers[i].edge();
    for(var j=asteroids.length-1;j>=0;j--){
      if (laser[i].hits(asteroids[j])){
        asteroids[i]
      }

}
}

}



orignal


for(var i=0;i<asteroids.length;i++){
  asteroids[i].render();
  asteroids[i].update();
  asteroids[i].edge();
}

for(var i=0;i<lasers.length;i++){
  lasers[i].render();
  lasers[i].update();
  lasers[i].edge();
}
