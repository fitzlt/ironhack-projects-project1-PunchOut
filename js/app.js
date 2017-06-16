$(".custom, .difficulty, .match, .ending").hide();

$(document).ready(function() {
  setInterval(function () {
    $(".original").hide(1000);
    $(".custom").show(1000);
  }, 2000);
});

$(document).ready(function() {
  $(".start").click(function() {
    $(".start").hide(0);
    $(".difficulty").show(0);
  });

  // Select difficulty level -----------------------------------

  $(".difficulty").click(function() {
    $(".titleScreen").hide(1000);
    $(".match").show(1000);

    // Game start ----------------------------------------------

    $(document).ready(function() {
      tyson.stand = new Animation(tyson.sheet, 0, 3, 4);
      tyson.stand.draw(450, 200);
      setTimeout(function () {
        $("#music")[0].play();
        setInterval(function () {
          ctx.clearRect(0, 0, 1024, 768);
          tyson.walk.update();
          tyson.walk.draw(450, 200);
        }, 1000 / 2.58);
      }, 3000);
    });
  });
});

//
// -------------------------------------------------------------------------
// Functions for spritesheet animations
// -------------------------------------------------------------------------
//

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');

function SpriteSheet(path, frameWidth, frameHeight) {
  this.image = new Image();
  this.frameWidth = frameWidth;
  this.frameHeight = frameHeight;

  // calculate the number of frames in a row after the image loads
  var self = this;
  this.image.onload = function() {
    self.framesPerRow = Math.floor(self.image.width / self.frameWidth);
  };

  this.image.src = path;
}

function Animation(spritesheet, frameSpeed, startFrame, endFrame) {

  var animationSequence = [];  // array holding the order of the animation
  var currentFrame = 0;        // the current frame to draw
  var counter = 0;             // keep track of frame rate

  // create the sequence of frame numbers for the animation
  for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
    animationSequence.push(frameNumber);

  // Update the animation
  this.update = function() {

    // update to the next frame if it is time
    if (counter == (frameSpeed - 1))
      currentFrame = (currentFrame + 1) % animationSequence.length;

    // update the counter
    counter = (counter + 1) % frameSpeed;
  };

  // draw the current frame
  this.draw = function(x, y) {
    // get the row and col of the frame
    var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
    var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);

    ctx.drawImage(
      spritesheet.image,
      col * spritesheet.frameWidth, row * spritesheet.frameHeight,
      spritesheet.frameWidth, spritesheet.frameHeight,
      x, y,
      spritesheet.frameWidth, spritesheet.frameHeight);
  };
}


//
// -------------------------------------------------------------------------
// Boxer Objects
// -------------------------------------------------------------------------
//

var tyson = {
  sheet: new SpriteSheet("./images/mike-tyson-use.png", 153.2, 236.8),
};

// tyson.stand = new Animation(tyson.sheet, 0, 1, 4);
tyson.walk = new Animation(tyson.sheet, 1, 6, 8);
tyson.punch = new Animation(tyson.sheet, 1, 13, 13);
tyson.uppercut = new Animation(tyson.sheet, 1, 9, 9);
tyson.headBack = new Animation(tyson.sheet, 1, 17, 17);
tyson.hipThrust = new Animation(tyson.sheet, 1, 16, 16);


//
// -------------------------------------------------------------------------
// Game Functions
// -------------------------------------------------------------------------
//

// Create random button calls to "light up". -------------------------------

var danceMoves = [".punch", ".uppercut", ".headBack", ".hipThrust"];
var randomIndex = Math.floor(Math.random() * 4);
var randomMove = danceMoves[randomIndex];

$(randomMove).addClass("on");



function walk() {
  ctx.clearRect(0, 0, 1024, 768);
  tyson.walk.draw(450, 200);
}

function stand() {
  ctx.clearRect(0, 0, 1024, 768);
  tyson.stand.draw(450, 200);
}

function punch() {
  ctx.clearRect(0, 0, 1024, 768);
  tyson.punch.draw(450, 200);
}

function uppercut() {
  ctx.clearRect(0, 0, 1024, 768);
  tyson.uppercut.draw(450, 200);
}

function headBack() {
  ctx.clearRect(0, 0, 1024, 768);
  tyson.headBack.draw(450, 200);
}

function hipThrust() {
  ctx.clearRect(0, 0, 1024, 768);
  tyson.hipThrust.draw(450, 200);
}

$(document).keydown(function(e) {
    switch(e.which) {
        case 65: // a
          punch();
          break;

        case 83: // s
          uppercut();
          break;

        case 75: // k
          headBack();
          break;

        case 76: // l
          hipThrust();
          break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});


$(document).ready(function () {
  $('.punch').click(function () {
    punch();
  });
});

$(document).ready(function () {
  $('.uppercut').click(function () {
    uppercut();
  });
});

$(document).ready(function () {
  $('.headBack').click(function () {
    headBack();
  });
});

$(document).ready(function () {
  $('.hipThrust').click(function () {
    hipThrust();
  });
});
// -------------------------------------------------------------------------
