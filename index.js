// Deklarasi variabel awal
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// Toggle A untuk mulai bermain game
$(document).keydown(function() {

  if (!started) {
    $(".title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// saat user klik salah satu tombol
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  // console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// Cek jawaban
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $(".title").text("Game Over, Press Any Key to Restart");

    restartGame();
  }
}

// Untuk generasi warna random
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $('.' + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// Membunyuikan suara saat ditekan tombol tertentu
function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

// Menampilkan animasi saat ditekan dombol tertentu
function animatePress(color) {
  // $(".btn").addClass("pressed").delay(100).removeClass("pressed")
  $("." + color).addClass("pressed");

  setTimeout(function() {
    $("." + color).removeClass("pressed");
  }, 100);
}

function restartGame(){
  level = 0;
  gamePattern = [];
  started = false;
}
