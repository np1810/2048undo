//37:left
//38:up
//39:right
//40:down
//82:r (restart)
var moves = [40,38,39,39,38,39,38,39,38,37];
var kEv = document.createEvent('KeyboardEvent');
var initMethod = typeof kEv.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';
var gC = document.getElementsByClassName('game-container') [0];
var sC = document.getElementsByClassName('score-container') [0];
var autoBreak = true;
var timerId,
prevScore,
newScore,
score,
highScore = 0,
breakScore = 3000;

sendKey(82);
timerId = setInterval(myLoop, 100);

function myLoop() {
  do
  {
    prevScore = sC.textContent.split('+') [0];
    sendKey(38);
    sendKey(39);
    newScore = sC.textContent.split('+') [0];
  } while (prevScore !== newScore);
  //sendKey(moves[Math.floor(Math.random() * 10)]);
  score = parseInt(sC.textContent.split('+') [0]);
  if (highScore < score) {
    highScore = score;
    console.clear();
    console.info(highScore);
  }
  if (document.getElementsByClassName('game-over').length === 1) sendKey(82);
  else if (document.getElementsByClassName('game-won').length === 1) clearInterval(timerId);
  else if (autoBreak && highScore > breakScore) {
    clearInterval(timerId);
    console.info('Auto - Broke!');
  }
}

function sendKey(keyCode) {
  kEv[initMethod]('keydown', true, true, window, false, false, false, false, keyCode, 0);
  gC.dispatchEvent(kEv);
}