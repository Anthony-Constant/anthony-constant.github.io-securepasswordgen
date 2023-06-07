document.addEventListener('DOMContentLoaded', initializePasswordGenerator);

function initializePasswordGenerator() {
  const characterAmountRange = document.getElementById('characterAmountRange');
  const characterAmountNumber = document.getElementById('characterAmountNumber');
  const includeUppercaseElement = document.getElementById('includeUppercase');
  const includeSymbolsElement = document.getElementById('includeSymbols');
  const includeNumbersElement = document.getElementById('includeNumbers');
  const form = document.getElementById('passwordGeneratorForm');
  const passwordDisplay = document.getElementById('passwordDisplay');

  characterAmountNumber.addEventListener('input', syncCharacterAmount);
  characterAmountRange.addEventListener('input', syncCharacterAmount);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    generateAndDisplayPassword();
  });

  function syncCharacterAmount(e) {
    const value = e.target.value;
    characterAmountNumber.value = value;
    characterAmountRange.value = value;
    generateAndDisplayPassword();
  }

  function generateAndDisplayPassword() {
    const characterAmount = characterAmountNumber.value;
    const includeUppercase = includeUppercaseElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols);
    passwordDisplay.innerText = password;
  }

  function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
    let charCodes = LOWERCASE_CHAR_CODES;
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);

    const passwordCharacters = [];
    for (let i = 0; i < characterAmount; i++) {
      const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
      passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join('');
  }

  function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
      array.push(i);
    }
    return array;
  }

  const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
  const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
  const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
  const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
    .concat(arrayFromLowToHigh(58, 64))
    .concat(arrayFromLowToHigh(91, 96))
    .concat(arrayFromLowToHigh(123, 126));

  // Initial password generation and display
  generateAndDisplayPassword();
}

// Get the copy button element
const copyButton = document.getElementById('copyButton');

// Add click event listener to the copy button
copyButton.addEventListener('click', () => {
  // Get the password display element
  const passwordDisplay = document.getElementById('passwordDisplay');
  
  // Create a temporary input element
  const tempInput = document.createElement('input');
  
  // Set the value of the temporary input element to the password text
  tempInput.value = passwordDisplay.textContent;
  
  // Append the temporary input element to the document
  document.body.appendChild(tempInput);
  
  // Select the text in the temporary input element
  tempInput.select();
  
  // Copy the selected text to the clipboard
  document.execCommand('copy');
  
  // Remove the temporary input element
  document.body.removeChild(tempInput);
  
  // Show a notification or provide visual feedback to indicate successful copy
  alert('Password copied to clipboard!');
});