document.addEventListener('DOMContentLoaded', initializePasswordGenerator);


function initializePasswordGenerator() {
  const characterCount = document.getElementById('characterCount');
  const characterAmountRange = document.getElementById('characterAmountRange');
  const includeUppercaseElement = document.getElementById('includeUppercase');
  const includeSymbolsElement = document.getElementById('includeSymbols');
  const includeNumbersElement = document.getElementById('includeNumbers');
  const form = document.getElementById('passwordGeneratorForm');
  const passwordDisplay = document.getElementById('passwordDisplay');

  characterAmountRange.addEventListener('input', syncCharacterAmount);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    generateAndDisplayPassword();
  });

  const regenerateBtn = document.getElementById('regenerateBtn');
  regenerateBtn.addEventListener('click', () => {
  const icon = regenerateBtn.querySelector('i');
  icon.classList.add('spin');

  generateAndDisplayPassword();

  // Remove class after animation so it can repeat
  setTimeout(() => {
    icon.classList.remove('spin');
  }, 500); // match the duration in CSS
});


document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("visible");
          }
      });
  });

  elements.forEach(element => {
      observer.observe(element);
  });
});

const toggleBtn = document.getElementById('toggleVisibility');
toggleBtn.addEventListener('click', () => {
  const actual = document.getElementById('passwordActual');
  const masked = document.getElementById('passwordMasked');

  const isRevealed = actual.style.display !== 'none';

  if (isRevealed) {
    actual.style.display = 'none';
    masked.style.display = 'inline';
    toggleBtn.innerHTML = '<i class="bi bi-eye"></i>';
  } else {
    actual.style.display = 'inline';
    masked.style.display = 'none';
    toggleBtn.innerHTML = '<i class="bi bi-eye-slash"></i>';
  }
});


  function syncCharacterAmount(e) {
    const value = e.target.value;
    characterCount.textContent = `${value} characters`;
    generateAndDisplayPassword();
  }
  
  function generateAndDisplayPassword() {
    const characterAmount = characterAmountRange.value;
    const includeUppercase = includeUppercaseElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
  
    const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols);
    
    document.getElementById('passwordActual').textContent = password;
    document.getElementById('passwordMasked').textContent = '•'.repeat(password.length);
  
    characterCount.textContent = `${password.length} characters`;
  
    // ✅ Password strength logic
    const strengthElement = document.getElementById('passwordStrength');
    let strength = '';
    let strengthClass = '';
  
    if (password.length <= 8) {
      strength = 'Weak';
      strengthClass = 'weak';
    } else if (password.length <= 12) {
      strength = 'Medium';
      strengthClass = 'medium';
    } else {
      strength = 'Strong';
      strengthClass = 'strong';
    }
  
    strengthElement.textContent = `Strength: ${strength}`;
    strengthElement.className = strengthClass;
  
    // Reset to visible by default
    document.getElementById('passwordActual').style.display = 'inline';
    document.getElementById('passwordMasked').style.display = 'none';
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
const passwordActual = document.getElementById('passwordActual');

copyButton.addEventListener('click', () => {
  const tempInput = document.createElement('input');
  tempInput.value = passwordActual.textContent; // only copy actual password
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  copyButton.textContent = 'Copied! ✅';
  copyButton.classList.add('copy-success');

  setTimeout(() => {
    copyButton.textContent = 'Copy Password';
    copyButton.classList.remove('copy-success');
  }, 1500);
});



  const faqs = document.querySelectorAll('.faq-question');

  faqs.forEach(faq => {
    faq.addEventListener('click', function () {
      const parent = faq.parentNode;
      parent.classList.toggle('active');
      
      const answer = parent.querySelector('.faq-answer');
      if (parent.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });





