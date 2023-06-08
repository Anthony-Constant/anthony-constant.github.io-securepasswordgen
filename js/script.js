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

// Copy Password to clipboard
const copyButton = document.getElementById('copyButton');
const passwordDisplay = document.getElementById('passwordDisplay');

copyButton.addEventListener('click', () => {
  const tempInput = document.createElement('input');
  tempInput.value = passwordDisplay.textContent;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  copyButton.textContent = 'Copied';
  copyButton.disabled = true;
  copyButton.classList.add('btn-success');

  setTimeout(() => {
    copyButton.textContent = 'Copy Password';
    copyButton.disabled = false;
    copyButton.classList.remove('btn-success');
  }, 2000); // Reset to original state after 2000 milliseconds (2 seconds)

  
});





