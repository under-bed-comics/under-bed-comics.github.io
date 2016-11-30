(function () {

  var SPACE = 32;
  var UP = 38;
  var RIGHT = 39;
  var LEFT = 37;
  var DOWN = 40;

  var canvasHeight = 256;
  var canvasWidth = 512;

  var speed = 100;

  // Handle keyboard controls
  var keysDown = {};

  addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
  }, false);

  addEventListener("keyup", function (e) {
  	delete keysDown[e.keyCode];
  }, false);

  var detectVerticalCollision = function (j, p) {
     return j.y < p.y && j.y + j.h > p.y - p.h;
  };

  var detectHorizontalCollision = function (j, p) {
     return j.x + j.w > p.x && j.x < p.x + p.w;
  };

  var detectCollision = function (jumpy, items) {
    for (var i=0; i<items.length; ++i) {
      var horizontalCollision = detectHorizontalCollision(jumpy, items[i]);
      var verticalCollision = detectVerticalCollision(jumpy, items[i]);
      if (horizontalCollision && verticalCollision) {
        return true;
      }
    }
    return false;
  };

  var nextHorizontal = function(dx, keysDown) {
    if (keysDown[LEFT]) {
      return speed;
    } else if (keysDown[RIGHT]) {
      return speed * -1;
    } else if (keysDown[SPACE]) {
      return 0;
    }

    return dx;
  };

  var nextVertical = function(dy, keysDown, timeDelta, onSurface) {
    if (onSurface && keysDown[UP]) {
      return speed * -3;
    } else {
      dy += timeDelta * 600;
    }
    return dy;
  };

  var onPlaform = function(timeDelta, oldJumpy, platforms) {
    var ny = oldJumpy.y - oldJumpy.dy * timeDelta;

    for (var i=0; i<platforms.length; ++i) {
      var platform = platforms[i];
      if (oldJumpy.y > platform.y && ny < platform.y && (oldJumpy.x + 15) > platform.x && (oldJumpy.x) < platform.x + platform.w) {
        return true;
      }
    }

    return false;
  };

  var nextJumpy = function(oldJumpy, timeDelta, keysDown, platforms) {
    var onSurface = oldJumpy.y === 0;

    if (onPlaform(timeDelta, oldJumpy, platforms)) {
      oldJumpy.dy = 0;
      onSurface = true;
    }

    var newJumpy = {
      x: oldJumpy.x - oldJumpy.dx * timeDelta,
      y: oldJumpy.y - oldJumpy.dy * timeDelta,
      dx: nextHorizontal(oldJumpy.dx, keysDown),
      dy: nextVertical(oldJumpy.dy, keysDown, timeDelta, onSurface),
    }

    if (newJumpy.x < 0) {
      newJumpy.x = 0;
      newJumpy.dx = 0;
    }

    if (newJumpy.x > canvasWidth-16) {
      newJumpy.x = canvasWidth-16;
      newJumpy.dx = 0;
    }

    if (newJumpy.y < 0) {
      newJumpy.y = 0;
      newJumpy.dy = 0;
    }

    if (newJumpy.y > canvasHeight-26) {
      newJumpy.y = canvasHeight-26;
    }

    return newJumpy;
  };


  var nextWorld = function(oldWorld, keysDown) {
    var timeDelta = Date.now() - oldWorld.time;

    return {
      time: oldWorld.time + timeDelta,
      jumpy: nextJumpy(oldWorld.jumpy, timeDelta/1000, keysDown, oldWorld.platforms),
      platforms: oldWorld.platforms,
      lava: oldWorld.lava,
    };
  };

  var translateY = function(y) {
    return canvasHeight - y;
  };

  var line = function(x1, y1, x2, y2) {
    y1 = translateY(y1);
    y2 = translateY(y2);
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
  }

  var circle = function(x, y, radius) {
    y = translateY(y);
    ctx.moveTo(x+radius, y);
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
  }

  var drawItems = function(items) {
    for (var i=0; i<items.length; ++i) {
      var item = items[i];
      ctx.fillRect(item.x, translateY(item.y), item.w, item.h);
    }
  };

  var drawLava = function(items) {
    ctx.fillStyle = "orange";
    drawItems(items);
  };

  var drawPlatforms = function(items) {
    ctx.fillStyle = "white";
    drawItems(items);
  };

  var drawJumpy = function(x, y) {
    ctx.beginPath();
    line(x+0, y+0, x+8, y+8);
    line(x+8, y+8,x+16, y+0);
    line(x+8, y+8, x+8,y+18);
    line(x+0,y+13,x+16,y+13);
    circle(x+8, y+22, 4);
    ctx.stroke();

    ctx.fillText(Math.floor(x) + ', ' +  Math.floor(y), 400, 10);
  };

  var drawHeart = function(x, y) {
    ctx.beginPath();
    line(0+x, 6+y, 6+x, 0+y);
    line(6+x, 0+y, 12+x, 6+y);
    ctx.arc(9+x, translateY(6+y), 3, 0, Math.PI, true);
    ctx.arc(3+x, translateY(6+y), 3, 0, Math.PI, true);
    ctx.fillStyle = "pink";
    ctx.fill();
  };

  var drawBox = function (x, y) {
    ctx.fillStyle = "white";
    ctx.fillRect(x, translateY(y), 12, 12);
  };

  var drawWorld = function(world) {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    drawPlatforms(world.platforms);
    drawLava(world.lava);
    drawJumpy(world.jumpy.x, world.jumpy.y);


    for (var i=0; i<12; ++i) {
      drawHeart(i * 14, canvasHeight-14);
    }

    for (var j=0; j<6; ++j) {
      drawBox(((j+i) * 14), canvasHeight -2);
    }
  };


  var canvas = document.getElementById("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  var ctx = canvas.getContext("2d");

  var world = {
    time: Date.now(),
    jumpy: {
      x: 50,
      y: 100,
      h: 26,
      w: 18,
      dx: 0,
      dy: 0,
    },
    platforms: [
      {x:30, y:50, w:80, h:10},
      {x:200, y:50, w:80, h:10},
      {x:370, y:100, w:80, h:10},
      {x:260, y:150, w:80, h:10},
      {x:150, y:200, w:80, h:10},
    ],
    lava: [
      {x:0, y:10, w:canvasWidth, h:10},
      {x:0, y:200, w:150, h:10},
      {x:0, y:200, w:10, h:190},
    ],
  };

  // The main game loop
  var main = function (oldWorld) {
	  var newWorld = nextWorld(oldWorld, keysDown);

	  drawWorld(newWorld);

  	requestAnimationFrame(main.bind(undefined, newWorld));
  };

  main(world);
})();
