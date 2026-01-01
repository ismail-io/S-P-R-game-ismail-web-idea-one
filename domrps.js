let re = '';
let choice = '';
let score = JSON.parse(localStorage.getItem('score')) || { win: 0, lose: 0, tie: 0 };

showresult();
showselection();
updatescore();

let isAuto = false;
let intervalId;

function autoplay() {
  if (!isAuto) {
    isAuto = true;
    intervalId = setInterval(() => {
      const userChoice = computerplay();
      play(userChoice);
    }, 1000);
  } else {
    clearInterval(intervalId);
    isAuto = false;
  }
}

function play(c) {
  computerplay();  // sets global 'choice'

  if (c === 'rock') {
    if (choice === 'rock') re = 'you tie';
    else if (choice === 'paper') re = 'you lose';
    else re = 'you win';
  }
  else if (c === 'paper') {
    if (choice === 'rock') re = 'you win';
    else if (choice === 'paper') re = 'you tie';
    else re = 'you lose';
  }
  else if (c === 'scissors') {
    if (choice === 'rock') re = 'you lose';
    else if (choice === 'paper') re = 'you win';
    else re = 'you tie';
  }

  if (re === "you win") score.win++;
  else if (re === "you lose") score.lose++;
  else score.tie++;

  localStorage.setItem('score', JSON.stringify(score));
  updatescore();
  showresult();
  showselection(c);
}

function showselection(userChoice = '') {
  document.querySelector('.jsselection').innerHTML =
    `you <img src="${userChoice}-emoji.png" class="css-rps"> ` +
    `computer <img src="${choice}-emoji.png" class="css-rps">`;
}
document.querySelector('.jsselection').innerHTML="";

function showresult() {
  document.querySelector('.jsresult').textContent = re;
}

function updatescore() {
  document.querySelector('.jsscore').textContent =
    `win:${score.win}, lose:${score.lose}, tie:${score.tie}`;
}

function computerplay() {
  const randomnum = Math.random();
  if (randomnum < 1 / 3) choice = "rock";
  else if (randomnum < 2 / 3) choice = "paper";
  else choice = "scissors";
  return choice;
}
