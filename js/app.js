$(".match, .ending").hide();

$(document).ready(function() {
  $("#ring").click(function() {
    $(".titleScreen").hide(2000);
    $(".match").show(2000);
  });
});

// var a = jQuery.Event("keypress")


// function SpriteSheet(path, frameWidth, frameHeight) {
//
//    var image = new Image();
//    var framesPerRow;
//
//    // calculate the number of frames in a row after the image loads
//    var self = this;
//    image.onload = function() {
//       framesPerRow = Math.floor(image.width / frameWidth);
//    };
//
//    image.src = path;
// }
