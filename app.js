/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetDisplay = false;

/*------------------------ Cached Element References ------------------------*/
const display = document.querySelector('.display');
const calculator = document.querySelector('#calculator');
const clearButton = document.querySelector('.button.operator:nth-child(1)');
const equalsButton = document.querySelector('.equals');

/*----------------------------- Event Listeners -----------------------------*/
calculator.addEventListener('click', (event) => {
  if (event.target.classList.contains('number')) {
    appendNumber(event.target.innerText);
  } else if (event.target.classList.contains('operator')) {
    chooseOperation(event.target.innerText);
  } else if (event.target.classList.contains('equals')) {
    evaluate();
  }s
});

clearButton.addEventListener('click', clear);

/*-------------------------------- Functions --------------------------------*/
function appendNumber(number) {
  if (display.innerText === '0' || shouldResetDisplay) resetDisplay();
  display.innerText += number;
}

function chooseOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = display.innerText;
  currentOperation = operator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperation === null || shouldResetDisplay) return;
  secondOperand = display.innerText;
  display.innerText = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  currentOperation = null;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b !== 0 ? a / b : 'Error';
    default:
      return null;
  }
}
//ik it has some bugs but i'm tired :')
function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function resetDisplay() {
  display.innerText = '';
  shouldResetDisplay = false;
}

function clear() {
  display.innerText = '0';
  firstOperand = '';
  secondOperand = '';
  currentOperation = null;
  shouldResetDisplay = false;
}
