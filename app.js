const displayedEquation = document.querySelector(".displayingEquation");
const displayedInput = document.querySelector(".currentInput");

const buttons = [...document.querySelectorAll("button")];
// const classInButton = buttons.map((item) => item.className);

let currentInput = "";
let termOne = "";
let termTwo = "";
let operation = "";

let termOneNum = 0;
let termTwoNum = 0;

let termOneDone = false;
let isFirstCalculation = true;
let afterCalculation = false;

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", (button) => {
    console.log("clicked");
    currentInput = buttons[i];
    handlingInput(currentInput);
  });
}

function handlingInput(userInput) {
  switch (userInput.className) {
    case "clearInput":
      termOne = "";
      termTwo = "";
      operation = "";
      displayedEquation.textContent = "";
      displayedInput.textContent = "";
      break;

    case "deleteInput":
      displayedInput.textContent = displayedInput.textContent.slice(0, -1);
      if (operation === "") {
        termOne = termOne.slice(0, -1);
      } else {
        termTwo = termTwo.slice(0, -1);
      }
      break;

    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "decimalPoint":
      if (termOneDone) {
        displayedInput.textContent = "";
      }
      if (operation === "") {
        termOne = updateTerm(termOne, userInput);
        displayedEquation.textContent = termOne;
      } else {
        termOneDone = false;

        if (!afterCalculation) {
          termTwo = updateTerm(termTwo, userInput);
          afterCalculation = true;
        } else {
          displayedInput.textContent = userInput.textContent;
          termTwo += userInput.textContent;
          afterCalculation = false;
        }
      }

      break;

    case "divide":
    case "multiply":
    case "subtract":
    case "addition":
      if (operation === "" || displayedEquation.textContent.slice(-1) === "=") {
        operation = userInput.textContent;
        if (displayedEquation.textContent.includes("=")) {
          displayedEquation.textContent = termOne;
        }
        displayedEquation.textContent += operation;
        termOneDone = true;
      } else {
        console.log("here");
        calculate();
        operation = userInput.textContent;
        displayedEquation.textContent += operation;
      }
      break;

    case "equals":
      let tempFirstTerm = termOne;
      let tempSecondTerm = termTwo;
      let tempOperation = operation;
      calculate();
      displayedEquation.textContent =
        tempFirstTerm + tempOperation + tempSecondTerm + "=";
      break;
  }
}

function updateTerm(term, input) {
  displayedInput.textContent += input.textContent;
  return (term += input.textContent);
}

function calculate() {
  displayedInput.textContent = "";

  termOneNum = parseFloat(termOne);
  termTwoNum = parseFloat(termTwo);

  if (operation === "÷") {
    if (isFirstCalculation) {
      divide(termOneNum, termTwoNum);
      isFirstCalculation = false;
    } else {
      divide(termOneNum, termTwoNum);
    }
  } else if (operation === "×") {
    if (isFirstCalculation) {
      multiply(termOneNum, termTwoNum);
      isFirstCalculation = false;
    } else {
      multiply(termOneNum, termTwoNum);
    }
  } else if (operation === "-") {
    if (isFirstCalculation) {
      subtract(termOneNum, termTwoNum);
      isFirstCalculation = false;
    } else {
      subtract(termOneNum, termTwoNum);
    }
  } else if (operation === "+") {
    if (isFirstCalculation) {
      add(termOneNum, termTwoNum);
      isFirstCalculation = false;
    } else {
      add(termOneNum, termTwoNum);
    }
  }
}

function divide(termOneNum, termTwoNum) {
  let calculatedNum = 0;
  calculatedNum = Math.round((termOneNum / termTwoNum) * 1000) / 1000;
  adjustDisplayAfterCalculation(calculatedNum);
}

function multiply(termOneNum, termTwoNum) {
  let calculatedNum = 0;
  calculatedNum = Math.round(termOneNum * termTwoNum * 1000) / 1000;
  adjustDisplayAfterCalculation(calculatedNum);
}

function subtract(termOneNum, termTwoNum) {
  let calculatedNum = 0;
  calculatedNum = termOneNum - termTwoNum;
  adjustDisplayAfterCalculation(calculatedNum);
}

function add(termOneNum, termTwoNum) {
  let calculatedNum = 0;
  calculatedNum = termOneNum + termTwoNum;
  adjustDisplayAfterCalculation(calculatedNum);
}

function adjustDisplayAfterCalculation(num) {
  displayedInput.textContent = num;
  termOne = num;
  displayedEquation.textContent = num;
  termTwo = "";
  console.log(num);
  afterCalculation = true;
}
