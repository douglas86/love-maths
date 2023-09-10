// Wait for the DOM to finish loading before running the game,
// Get the button clicks and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (this.getAttribute("data-type") === "submit") {
        checkAnswer();
      } else {
        let gameType = this.getAttribute("data-type");
        runGame(gameType);
      }
    });
  }

  document
    .getElementById("answer-box")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        checkAnswer();
      }
    });

  runGame("addition");
});

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's first answer was processed
 */
function runGame(gameType) {
  document.getElementById("answer-box").value = "";
  document.getElementById("answer-box").focus();

  // creates two random numbers between 1 and 25
  let num1 = Math.floor(Math.random() * 25) + 1;
  let num2 = Math.floor(Math.random() * 25) + 1;

  switch (gameType) {
    case "addition":
      return displayAdditionQuestions(num1, num2);
    case "multiply":
      return displayMultiplyQuestions(num1, num2);
    case "subtract":
      return displaySubtractQuestions(num1, num2);
    case "division":
      return displayDivideQuestions(num1, num2);
    default:
      alert(`unknown game type: ${gameType}`);
      throw `unknown game type: ${gameType}.Aborting!`;
  }
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
  let userAnswer = parseInt(document.getElementById("answer-box").value);
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];

  if (isCorrect) {
    alert("Hey, you got it right!");
    incrementScore();
  } else {
    alert(
      `Awww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}`,
    );
    incrementWrongAnswer();
  }

  runGame(calculatedAnswer[1]);
}

/**
 * Get the operands (the numbers) and the operators (plus, minus, etc.)
 * directly from the DOM, and returns the correct answer
 */
function calculateCorrectAnswer() {
  let operand1 = parseInt(document.getElementById("operand1").innerText);
  let operand2 = parseInt(document.getElementById("operand2").innerText);
  let operator = document.getElementById("operator").innerText;

  switch (operator) {
    case "+":
      return [operand1 + operand2, "addition"];
    case "x":
      return [operand1 * operand2, "multiply"];
    case "-":
      return [operand1 - operand2, "subtract"];
    case "/":
      return [operand1 / operand2, "division"];
    default:
      alert(`unimplemented operator ${operator}`);
      throw `unimplemented operator ${operator}.Aborting!`;
  }
}

/**
 * Gets current score from DOM and increments by 1
 */
function incrementScore() {
  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets the current tall of incorrect answers from DOM and increments by 1
 */
function incrementWrongAnswer() {
  let oldScore = parseInt(document.getElementById("incorrect").innerText);
  document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestions(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestions(operand1, operand2) {
  document.getElementById("operand1").textContent =
    operand1 > operand2 ? operand1 : operand2;
  document.getElementById("operand2").textContent =
    operand1 > operand2 ? operand2 : operand1;
  document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestions(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "x";
}

function displayDivideQuestions(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1 * operand2;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "/";
}
