console.log("Javascript Calculator Made by Dev7HD\nhttps://github.com/Dev7HD");

// Variable declarations
let op = '';
let storArr = [];
let screenValue = '';
let flag = 0;
let isSign = true;

// Function to check if a character is a number
const isNumber = (char) => /^\d$/.test(char);

// Getting the display element
const $screen = $("#answer").prop("readOnly", true);

// Function to handle button click
const handleButtonClick = (buttonText) => {
  // Logic based on the button text
  if (buttonText === "X" && !isSign) {
    buttonText = "*";
    screenValue += buttonText;
    isSign = true;
  } else if (buttonText === "AC") {
    eraseInput();
    // Add pop-up on click on 'AC'
    $('.overlay').addClass('show');
    $screen.focus();
  } else if (buttonText === "=") {
    makeCal();
  } else if (buttonText === "(" || buttonText === ")") {
    screenValue += buttonText;
    op = screenValue;
  } else if (isNumber(buttonText)) {
    screenValue = flag ? buttonText : screenValue + buttonText;
    op = screenValue;
    flag = 0;
    isSign = false;
    $screen.removeClass("negative");
  } else {
    if (!isSign) {
      screenValue = $screen.val() + buttonText;
      isSign = true;
      op = screenValue;
    }
    $screen.removeClass("negative");
  }
  $screen.val(screenValue);
};

// Adding click event listeners to buttons
$("button").on("click", function () {
  const buttonText = $(this).text();
  handleButtonClick(buttonText);
});

// Handling keyboard inputs
$(document).on("keydown", function (event) {
  const key = event.key;
  if (key === 'Enter') {
    op = $screen.val();
    makeCal();
  } else if (key === 'Escape') {
    //Handling 'Escape' keydown event
    $('#errorModal, #history').removeClass("show");
    $('#bar1, #bar2').hide(500);
    eraseInput();
    $('.overlay').removeClass('show');
  } else if (!isNaN(key) || '+-*/.()'.includes(key)) {
    screenValue += key;
    $screen.val(screenValue);
  } else if (key === 'Backspace') {
    screenValue = $screen.val().slice(0, -1);
    $screen.val(screenValue);
    $screen.toggleClass("negative", parseFloat(screenValue) < 0);
  }
});

// Function to perform calculations
const makeCal = () => {
  checkForBracketMulti();
  $screen.toggleClass("negative", parseFloat($screen.val()) < 0);
};

// Function to erase input
const eraseInput = () => {
  // Clearing input values and removing classes
  op = '';
  screenValue = '';
  $screen.val(screenValue);
  $screen.removeClass("negative");
  isSign = true;
};

// Function to store calculation history
const storing = (operation, result) => {
  storArr.push({ op: operation, result: result });
  localStorage.setItem("calcHistory", JSON.stringify(storArr));
};

// Function to check for bracket multiplication
function checkForBracketMulti() {
  // Checking and performing calculations involving brackets
  const calculateValue = new Function('return ' + screenValue)();
  if (calculateValue !== undefined) {
    $screen.val(calculateValue);
    screenValue = $screen.val();
    let res = screenValue;
    storing(op, res);
    $screen.toggleClass("negative", parseFloat($screen.val()) < 0);
  }
  flag = 1;
}

// Error handling
window.onerror = () => {
  $('#errorModal').addClass("show");
  // Prevent default browser error handling
  return false;
};

// Close the modal when clicking the close button (×)
$('#errorModal .modal-content .close').on("click", () => {
  $('#errorModal').removeClass("show");
});

$('#popup1 .popup_1 .close').on('click', () => {
  $('.overlay').removeClass('show');
});
