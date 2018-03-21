var startScreen = document.querySelector('#game-start');
var startBtn = document.querySelector('#game-start>button');
var restartBtn = document.querySelector('#game-over>button');

var countryFlag = document.querySelectorAll('.flag>img');
var countryName = document.querySelector('h2');
var tab = [];
var counter = 0;
var flag = document.querySelectorAll('.flag');

var lives = document.querySelectorAll('.lives>img');
var lifeCounter = 3;

var score = document.querySelector('.score>strong');
var scoreCounter = 0;
var time = document.querySelector('.time');
var timeLeft = document.querySelector('.time>span').innerHTML;
var gameOverScreen = document.querySelector('#game-over');


// Start the game
function startGame() {
  startScreen.classList.toggle('is-open');
}

// Get random flags
function randomizer() {
  while (counter < countryFlag.length) {
    var randomCountry = flags[Math.floor(Math.random() * flags.length)];
    if (!tab.includes(randomCountry)) {
      tab.push(randomCountry);
      countryFlag[counter].src = "flags/" + randomCountry.code + ".svg"
      counter++;
    }
  }
  countryName.innerHTML = tab[Math.floor(Math.random() * tab.length)].name;
  counter = 0;
  // Remove class is-active
  for (let i = 0; i < countryFlag.length; i++) {
    flag[i].classList.remove('is-active');
  }
}
var timer;
// Countdown timer
function countdown() {
  var timer = setInterval(function () {
    timeLeft--;
    document.querySelector('.time>span').innerHTML = timeLeft;
    if (timeLeft <= 5) { //juste du style osef
      time.style.color = "rgb(211, 56, 9)"; //juste du style osef
    } else { //juste du style osef
      time.style.color = ""; //juste du style osef
    }
    if (timeLeft <= 0) {
      tab.splice(0, 4);
      clearInterval(timer);
      gameOverScreen.classList.add('is-open');
    }
  }, 1000);
}

// Check if clicked on the good flag
function answer() {
  for (let i = 0; i < countryFlag.length; i++) {
    countryFlag[i].addEventListener('click', function () {
      if (tab[i].name !== countryName.innerHTML) {
        flag[i].classList.add('is-active');
        lifeCounter--;
        lives[lifeCounter].classList.add('is-active');
        if (lifeCounter == 0) {
          //besoin de clearinterval 
          gameOverScreen.classList.add('is-open');
          tab.splice(0, 4);
        }
      } else {
        timeLeft = timeLeft + 3;
        if (timeLeft >= 30) {
          timeLeft = 30;
        }
        score.innerHTML = scoreCounter + 1;
        scoreCounter++;
        tab.splice(0, 4);
        randomizer();
      }
    });
  }
}

// Restart the game
function restartGame() {
  timeLeft = 20;
  scoreCounter = 0;
  score.innerHTML = 0;
  lifeCounter = 3;
  countdown();
  for (let i = 0; i < lives.length; i++) {
    lives[i].classList.remove('is-active');
  }
  gameOverScreen.classList.toggle('is-open');
}

randomizer();

startBtn.addEventListener('click', function () {
  startGame();
  countdown();
  answer();
});

restartBtn.addEventListener('click', function () {
  randomizer();
  restartGame();
});