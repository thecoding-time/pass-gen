// Validate user input and ensure that at least one character type is selected.
// Once all prompts are answered, the user will be presented with a password matching the answered prompts. Displaying the generated password in an alert is acceptable, but attempt to write the password to the page instead.

// Array of special characters to be included in password
const specialCharacters = [
  "@",
  "%",
  "+",
  "/",
  "'",
  "!",
  "#",
  "$",
  "^",
  "?",
  ":",
  ")",
  "(",
  "}",
  "{",
  "]",
  "[",
  "~",
  "-",
  "_",
  ".",
];

// Array of numeric characters to be included in password
const numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Array of lowercase characters to be included in password
const lowerCasedCharacters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// Array of uppercase characters to be included in password
const upperCasedCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// DOM Elements
const slider = document.getElementById("range-slider");
const sliderNumber = document.getElementById("range-number");
const passwordDisplay = document.getElementById("password-display");
const passwordStrength = document.getElementById("passwordStrength");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
// Forms
const optionsForm = document.getElementById("options-form");
const displayForm = document.getElementById("display-form");
// Checkboxes
const checkboxUppercase = document.getElementById("checkbox-uppercase");
const checkboxLowercase = document.getElementById("checkbox-lowercase");
const checkboxNumbers = document.getElementById("checkbox-numbers");
const checkboxSymbols = document.getElementById("checkbox-symbols");
// Buttons
const copy = document.getElementById("copy");
const generate = document.getElementById("generate");
const copyButton = document.getElementById("copy-btn");
const generateButton = document.getElementById("generate-btn");
const closeButton = document.getElementById("close");
const closeModal = document.getElementById("closeModal");
// Alerts/toasts
const toastMessage = document.querySelector(".info-toast");

// sync the range slider and number values together
function syncCharacters(event) {
  // set the value to get the event.target.value that was dispatched
  const value = event.target.value;
  // set the slider value to the event
  slider.value = value;
  // set the slider number to the value of the event
  sliderNumber.value = value;
}

// function to set the interval of the toast message
function infoToastMessage() {
  // how many seconds to display
  let secondsLeft = 5;
  // interval function set to messageTime
  const messageTime = setInterval(function () {
    // display the toast message div
    toastMessage.style.display = "block";
    // decrease the secondsLeft every second
    secondsLeft--;

    // when the timer reaches zero
    if (secondsLeft == 0) {
      // hide the toast message div
      toastMessage.style.display = "none";
      // clear the interval
      clearInterval(messageTime);
    }

    // listen to the close button being clicked
    closeButton.addEventListener("click", () => {
      // set the toast message div to display none
      toastMessage.style.display = "none";
      // and clear the interval
      clearInterval(messageTime);
    });
  }, 1000);
}

// function to get the password options values
function getPasswordOptions() {
  // check to see password options
  // check the character amount
  let characterAmount = +sliderNumber.value;
  console.log(typeof characterAmount);
  // check if uppercase was checked (true or false)
  let hasUppercase = checkboxUppercase.checked;
  // check if lowercase was checked (true or false)
  let hasLowercase = checkboxLowercase.checked;
  // check if numbers was checked (true or false)
  let hasNumber = checkboxNumbers.checked;
  // check if symbols was checked (true or false)
  let hasSymbols = checkboxSymbols.checked;

  console.log(
    characterAmount,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSymbols
  );

  // if no options are selected - return an alert
  if (
    hasUppercase == false &&
    hasLowercase == false &&
    hasNumber == false &&
    hasSymbols == false
  ) {
    infoToastMessage();
    return;
  }

  // toggle weak class is the password length is greater than 3
  // and less than or equal to 7
  passwordStrength.classList.toggle(
    "password-strength-weak",
    characterAmount <= 7 && characterAmount > 3
  );

  // toggle okay class is the password length is greater than or equal to 8
  // and less than or equal to 11
  passwordStrength.classList.toggle(
    "password-strength-okay",
    characterAmount >= 8 && characterAmount <= 11
  );

  // toggle good class is the password length is greater than or equal to 12
  // and less than or equal to 15
  passwordStrength.classList.toggle(
    "password-strength-good",
    characterAmount >= 12 && characterAmount <= 15
  );

  // toggle great class is the password length is greater than or equal to 16
  passwordStrength.classList.toggle(
    "password-strength-great",
    characterAmount >= 16
  );

  // Object to store the user input
  const passwordOptions = {
    characterAmount,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSymbols,
  };

  return passwordOptions;
}

// function for getting randon characters
function getRandomCharacters(array) {
  // get a random index
  const randomIndex = Math.floor(Math.random() * array.length);
  // grabd the random character
  const randomCharacter = array[randomIndex];

  return randomCharacter;
}

// function to generate the password using the characters arrays
function generatePassword() {
  // calling the getPasswordOptions function to get the passwordOptions object
  const options = getPasswordOptions();

  // variable to store password as it's being concatenated
  let result = [];

  // Array to store types of characters to include in password
  let possibleCharacters = [];

  // Conditional statement that adds array of uppercase characters into array of possible characters based on user input
  if (options.hasUppercase) {
    // Return a new array based on the merging of possibleCharacters and uppCasedCharacters
    possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
  }

  // Conditional statement that adds array of lowercase characters into array of possible characters based on user input
  if (options.hasLowercase) {
    // Return a new array based on the merging of possibleCharacters and lowerCasedCharacters
    possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
  }

  // Conditional statement that adds array of number characters into array of possible characters based on user input
  if (options.hasNumber) {
    // Return a new array based on the merging of possibleCharacters and numericCharacters
    possibleCharacters = possibleCharacters.concat(numericCharacters);
  }

  // Conditional statement that adds array of symbol characters into array of possible characters based on user input
  if (options.hasSymbols) {
    // Return a new array based on the merging of possibleCharacters and specialCharacters
    possibleCharacters = possibleCharacters.concat(specialCharacters);
  }

  // For loop to iterate over the password length from the options object, selecting random indices from the array of possible characters and concatenating those characters into the password variable
  for (let i = 0; i < options.characterAmount; i++) {
    const possibleCharacter = getRandomCharacters(possibleCharacters);

    // push the possibleCharacter to the results array
    result.push(possibleCharacter);
  }

  console.log(result);
  // join the array with a blank string
  // otherwise by default the password will have commas seperating each value
  return result.join("");
}

// function to write password to the DOM
function writePassword() {
  // the password is set to the returned result array from generatePassword
  const password = generatePassword();

  // set the selected DOM passwordDisplay
  const passwordText = passwordDisplay;

  // show the password in the password display box
  passwordText.value = password;

  return password;
}

// function to open and close the cpoied modal
function copiedModal() {
  const password = writePassword();
  // how many seconds to display
  let secondsLeft = 5;
  // interval function set to messageTime
  const messageTime = setInterval(function () {
    // display the modal message div
    modal.style.display = "block";
    //
    modalText.innerHTML = `Your password ${password} was copied to your clipboard.`;
    // decrease the secondsLeft every second
    secondsLeft--;

    // when the timer reaches zero
    if (secondsLeft == 0) {
      // hide the modal message div
      modal.style.display = "none";
      // clear the interval
      clearInterval(messageTime);
    }

    // listen to the close button being clicked
    closeModal.addEventListener("click", () => {
      // set the modal message div to display none
      modal.style.display = "none";
      // and clear the interval
      clearInterval(messageTime);
    });

    // listen to the click outside of the modal being clicked
    window.addEventListener("click", (event) => {
      // the dark area seen is all the id of modal
      // if the click happened on the modal id
      if (event.target === modal) {
        // set the modal message div to display none
        modal.style.display = "none";
        // clear the interval
        clearInterval(messageTime);
      }
    });
  }, 1000);
}

// function to copy the password to clipboard
function copyToClipboard() {
  // set the passwordDisplay input to a variable
  let passwordText = passwordDisplay;

  // select the passwordText
  passwordText.select();
  // using the clipboard API to copy the text
  document.execCommand("copy");

  copiedModal();
}

// event listener for the options form
optionsForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

// event listener for the display form
displayForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

// event listener on the range slider
slider.addEventListener("input", syncCharacters);
slider.addEventListener("input", writePassword);

// event listener on the number value
sliderNumber.addEventListener("input", syncCharacters);
sliderNumber.addEventListener("input", writePassword);

// event listners for the generate buttons
generateButton.addEventListener("click", writePassword);
generate.addEventListener("click", writePassword);

// event listener for the copy buttons
copyButton.addEventListener("click", copyToClipboard);
copy.addEventListener("click", copyToClipboard);
