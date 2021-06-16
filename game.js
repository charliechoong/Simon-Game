var buttonColors = ['red', 'blue', 'green', 'yellow']
var gamePattern = [];
var userClickedPattern = [];

var gameStarted = 0;
var level = 0;

function checkAnswer(currentLevel) {
  console.log(gamePattern);
  console.log(userClickedPattern);
  for (let i=0; i<=currentLevel; i++) {
    if (gamePattern[i] != userClickedPattern[i]) {
      return false;
    }
  console.log('success');
  return true;
  }
}

function nextSequence() {
  level += 1;
  $('h1').text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
  userClickedPattern = [];
}

function startOver() {
  gameStarted = 0;
  level = 0;
  gamePattern = [];
}

function animatePress(currentColor) {
  $('.' + currentColor).fadeOut(100).fadeIn(100);
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

$(".btn").click(function() {
  var userClickedButton = $(this).attr('id');
  userClickedPattern.push(userClickedButton);
  animatePress(userClickedButton);
  playSound(userClickedButton);
  if (userClickedPattern.length === level) {
    if (checkAnswer(level)) {
      setTimeout(nextSequence, 2000);
    }
    else {
      var audio = new Audio('sounds/wrong.mp3')
      audio.play();
      $('body').addClass('game-over');
      $('h1').text('GAME OVER!');
      setTimeout(function() {
        $('body').removeClass('game-over');
        $('h1').text('Game Over, Press Any Key to Restart');
        startOver();
      }, 2000);
    }
  }
})

$(document).keydown(function() {
  if (gameStarted == 0) {

    setTimeout(function() {
      nextSequence();
      gameStarted = 1;
    }, 1000);
  }
})
