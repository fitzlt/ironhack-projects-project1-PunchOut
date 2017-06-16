$(".original, .match, .ending").hide();

$(document).ready(function() {
  setInterval(function () {
    $("header").hide(1000);
  }, 3000);
});

$(document).ready(function() {
  $(".start").click(function() {
    $(".titleScreen").hide(2000);
    $(".match").show(2000);
  });
});

// var a = jQuery.Event("keypress")

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

tyson.walk = new Animation(tyson.sheet, 1, 1, 4);
tyson.stand = new Animation(tyson.sheet, 1, 6, 8);
tyson.punch = new Animation(tyson.sheet, 1, 12, 13);
tyson.uppercut = (function () {
  new Animation(tyson.sheet, 1, 9, 9);
  new Animation(tyson.sheet, 1, 11, 11);
});
tyson.hitHigh = new Animation(tyson.sheet, 1, 17, 17);
tyson.hitLow = new Animation(tyson.sheet, 1, 16, 16);

setInterval(function () {
  ctx.clearRect(0, 0, 1024, 768);
  tyson.stand.update();
  tyson.stand.draw(450, 200);
}, 350);

// -------------------------------------------------------------------------
//
// var littleMac = {
//   sheet: new SpriteSheet("./images/little-mac-use.png", 100, 194),
// };
//
// littleMac.walk = new Animation(littleMac.sheet, 1, 0, 1);
// littleMac.stand = new Animation(littleMac.sheet, 1, 0, 1);
// littleMac.lightPunch = new Animation(littleMac.sheet, 1, 32, 34);
// littleMac.hardPunch = new Animation(littleMac.sheet, 1, 45, 50);
// littleMac.dodge = new Animation(littleMac.sheet, 1, 8, 10);

// setInterval(function () {
//   ctx.clearRect(0, 0, 1024, 768);
//   littleMac.lightPunch.update();
//   littleMac.lightPunch.draw(450, 400);
// }, 500);

//
// -------------------------------------------------------------------------
// Game Functions
// -------------------------------------------------------------------------
//
//
// setInterval(function() {
//   ctx.clearRect(0, 0, 1024, 768);
// });

$(document).keydown(function(e) {
    switch(e.which) {
        case 32: // spacebar
          littleMac.dodge();
        break;

        case 188: // comma
          littleMac.lightPunch();
        break;

        case 190: // period
          littleMac.hardPunch();
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
