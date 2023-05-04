const buttons = document.querySelectorAll("button");
const playerScoreDisplay = document.getElementById("player-score");
const highScoreDisplay = document.getElementById("high-score");
const resultDisplay = document.getElementById("result");
const levelSelect = document.getElementById("level-select");
const winningCombinations = {
  Rock: { Scissor: true, Lizard: true },
  Paper: { Rock: true, Spock: true },
  Scissor: { Paper: true, Lizard: true },
  Lizard: { Paper: true, Spock: true },
  Spock: { Scissor: true, Rock: true },
};

let playerScore = 0;
let highScore = localStorage.getItem("highScore") || 0;

function updateScores() {
  playerScoreDisplay.textContent = playerScore;
  highScoreDisplay.textContent = highScore;
}

function getComputerChoice(level) {
  const choices = ["Rock", "Paper", "Scissor", "Lizard", "Spock"];
  let randomNumber;

  switch (level) {
    case "easy":
      randomNumber = 0;
      break;
    case "hard":
      const weights = [1, 2, 2, 3, 3];
      const weightSum = weights.reduce((acc, cur) => acc + cur);
      const weightedRandom = Math.floor(Math.random() * weightSum);
      let weightAccumulator = 0;
      for (let i = 0; i < choices.length; i++) {
        weightAccumulator += weights[i];
        if (weightedRandom < weightAccumulator) {
          randomNumber = i;
          break;
        }
      }
      break;
    default:
      randomNumber = Math.floor(Math.random() * 5);
      break;
  }

  return choices[randomNumber];
}

function win(playerChoice, computerChoice) {
  playerScore++;
  resultDisplay.textContent = `${playerChoice} slår ${computerChoice}. Du vinner!`;
  if (playerScore > highScore) {
    highScore = playerScore;
    localStorage.setItem("highScore", highScore);
  }
  updateScores();
}

function lose(playerChoice, computerChoice) {
  playerScore = 0;
  resultDisplay.textContent = `${playerChoice} taper mot ${computerChoice}. Du taper!`;
  updateScores();
}

function draw(playerChoice, computerChoice) {
  resultDisplay.textContent = `${playerChoice} og ${computerChoice} er like. Det er uavgjort!`;
  updateScores();
}

function game(playerChoice, level) {
  const computerChoice = getComputerChoice(level);
  const result =
    playerChoice === computerChoice
      ? null
      : winningCombinations[playerChoice][computerChoice]
      ? true
      : false;

  if (result === null) {
    draw(playerChoice, computerChoice);
  } else if (result === true) {
    win(playerChoice, computerChoice);
  } else {
    lose(playerChoice, computerChoice);
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    game(button.id, levelSelect.value);
  });
});

updateScores();
