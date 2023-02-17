const selectionButtons = document.querySelectorAll('[data-selection]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const finalScoreSpan = document.querySelector('[data-final-score]');
const reloadBtn = document.querySelector('.reload');
const computerSelectionSpan = document.querySelector('[computer-selection]');
const playerSelectionSpan = document.querySelector('[player-selection]');


let playerScore = 0;
let computerScore = 0;

const SELECTIONS = [
  {
    name: 'rock',
    id: 1,
  },
  {
    name: 'paper',
    id: 2,
  },
  {
    name: 'scissors',
    id: 3,
  },
];

initGame();

function initGame() {
  playerMove();
  resetGame();
}
// get what button player pressed. After 5 points winned by player the game is over, so the compareScore() shows the final score
function playerMove() {
  selectionButtons.forEach((selectionButton) => {
    selectionButton.addEventListener('click', (e) => {
      if (playerScore === 5 || computerScore === 5) {
        compareScore();
        return;
      }
      const computerSelection = randomSelection();
      const playerSelection = selectionButton.dataset.selection;
      verifyWinner(computerSelection, playerSelection);
    });
  });
}
//get a random selection for computer
function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  const selection = SELECTIONS[randomIndex];
  return selection.name;
}

function verifyWinner(computerSelection, playerSelection) {
  if (playerSelection === 'rock' && computerSelection === 'scissors') {
    playerScore++;
  } else if (playerSelection === 'scissors' && computerSelection === 'paper') {
    playerScore++;
  } else if (playerSelection === 'paper' && computerSelection === 'rock') {
    playerScore++;
  } else if (playerSelection===computerSelection) {
    playerScore=playerScore;
    computerScore=computerScore;
  } 
  else {
    computerScore++;
  }
  displayScore();
  diplayGame(computerSelection, playerSelection);
  if (playerScore === 5 || computerScore === 5) {
    compareScore();
    return;
  }
}

function compareScore() {
  if (computerScore < playerScore) {
    finalScoreSpan.innerHTML = 'You are the winner 🏆 ';
  } else if (computerScore === playerScore) {
    finalScoreSpan.innerHTML = 'Tie';
  } else {
    finalScoreSpan.innerHTML = 'The computer is the winner 🏆 ';
  }
}

function resetGame() {
  reloadBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    finalScoreSpan.innerHTML = ' ';
    displayScore();
    playerSelectionSpan.innerHTML ='Choose your move ';
    computerSelectionSpan.innerHTML='Computer is ready ';
  });
}

function displayScore() {
  computerScoreSpan.innerHTML = computerScore;
  yourScoreSpan.innerHTML = playerScore;
}

function diplayGame(computerSelection, playerSelection) {
    playerSelectionSpan.innerHTML = 'You played ' + playerSelection;
    computerSelectionSpan.innerHTML = 'Computer played ' + computerSelection;
}