// Logging information about the calculator
console.log("Javascript Calculator Made by Dev7HD\nhttps://github.com/Dev7HD");

// Variable declarations
let op = '';
let storArr = [];
let screenValue = '';
let flag = 0;
let isSign = true;
const errorModal = document.getElementById("errorModal");

// Function to check if a character is a number
const isNumber = (char) => /^\d$/.test(char);

// Getting the display element
const screen = document.getElementById("answer");
screen.readOnly = true;

// Function to handle button click
const handleButtonClick = (buttonText) => {
  // Logic based on the button text
  if (buttonText === "X" && !isSign) {
    buttonText = "*";
    screenValue += buttonText;
  } else if (buttonText === "AC") {
    eraseInput();
    $("#answer").focus()
  } else if (buttonText === "=") {
    makeCal();
  } else if (buttonText === "(" || buttonText === ")") {
    screenValue += buttonText;
    op = screenValue;
  } else if (isNumber(buttonText)) {
    if (flag === 1) {
      screenValue = buttonText;
      op = screenValue;
      flag = 0;
    } else {
      screenValue += buttonText;
      op = screenValue;
    }
    isSign = false;
    screen.classList.remove("negative");
  } else {
    if (!isSign) {
      screenValue = screen.value + buttonText;
      isSign = true;
      op = screenValue;
    }
    screen.classList.remove("negative");
  }
  screen.value = screenValue;
};

// Adding click event listeners to buttons
document.querySelectorAll("button").forEach((item) => {
  item.addEventListener("click", (e) => {
    const buttonText = e.target.innerText;
    handleButtonClick(buttonText);
  });
});

// Handling keyboard inputs
$(document).keydown(function (event) {
  const key = event.key;
  if (key === 'Enter') {
    op = screen.value;
    makeCal();
  } else if (key === 'Escape') {
    //Handling 'Escape' keydown event
    errorModal.classList.remove("show")
    $('#history').removeClass("show")
    $('#bar1').hide(500)
    $('#bar2').hide(500)
    eraseInput();
  } else if (!isNaN(key) || '+-*/.()'.includes(key)) {
    screenValue = screen.value + key;
    screen.value = screenValue;
  } else if (key === 'Backspace') {
    screenValue = screen.value.slice(0, -1);
    screen.value = screenValue;
    screen.classList.toggle("negative", parseFloat(screenValue) < 0);
  }
});

// Function to perform calculations
const makeCal = () => {
  // Check for brackets and perform calculations
  checkForBracketMulti();
  screen.classList.toggle("negative", parseFloat(screen.value) < 0);
};

// Function to erase input
const eraseInput = () => {
  // Clearing input values and removing classes
  op = '';
  screenValue = '';
  screen.value = screenValue;
  screen.classList.remove("negative");
  isSign = true;
};

// Function to store calculation history
const storing = (operation, result) => {
  // Storing operations and results
  storArr.push({ op: operation, result: result });
  localStorage.setItem("calcHistory", JSON.stringify(storArr));
};

// Function to check for bracket multiplication
function checkForBracketMulti() {
  // Checking and performing calculations involving brackets
  const calculate = new Function('return ' + screenValue);
  const calculateValue = calculate();
  if (calculateValue !== undefined) {
    screen.value = calculateValue;
    screenValue = screen.value;
    let res = screenValue;
    storing(op, res);
    screen.classList.toggle("negative", parseFloat(screen.value) < 0);
  }
  flag = 1;
}

// Error handling

window.onerror =  () => {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = "PLEASE INPUT VALID EXPRESSION";
  errorModal.classList.add("show")
  // Prevent default browser error handling
  return false;
};

// Close the modal when clicking the close button (×)
document.querySelector(".close").addEventListener("click", function () {
  errorModal.classList.remove("show")
});
