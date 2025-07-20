// --------------- Main Process - Start --------------------------
let signupScreen = document.querySelector('.c-signup');
let completeScreen = document.querySelector('.c-signup-complete');
let signupForm = signupScreen.querySelector('.c-signup form');
let signedUpEmailElement = document.getElementById('signedUpEmail');

signupForm.addEventListener('submit', handleSubmit);
// --------------- Main Process - End --------------------------

// --- Handler for form's onsubmit event
function handleSubmit(e) {
  // 1. prevent default browser behaviour
  e.preventDefault(e);

  // 2. Retrieving data from the form
  const data = Object.fromEntries(new FormData(e.target));
  
  // 3. validating the data
  if (validateSignupForm(data)) {
    // If input is valid, then show complete screen
    signedUpEmailElement.textContent = data.email;
    toggleScreen();
  }
}

// --- Validate all input fields of form.
function validateSignupForm(data) {
  // Validate email field
  const checkEmailRlt = validateEmail(data.email);

  // Validate abc field
  // ...

  // If exists one field has error -> invalid
  if (!checkEmailRlt) { // || !checkAbcRlt
    return false;
  }

  // valid
  return true;
}

// Validate [email] input field then show/hide error message.
function validateEmail(email) {
  let errMsg = '';
  if (!email) {
    errMsg = 'Valid email required';
  } else {
    const isValidEmail = /^\S+@\S+$/g
    if (!isValidEmail.test(email)) {
      errMsg =  'Valid email required';
    }
  }

  // show/hide error message
  toggleErrorMessage(errMsg, "email", errMsg);
  
  return errMsg == '';
}

// Show/Hide error message for [inputName] input field.
function toggleErrorMessage(show, inputName, errMsg) {
  const inputElement = document.querySelector(`input[name="${inputName}"]`);
  const errorMessageElement = document.querySelector(`.form-field:has(input[name="${inputName}"]) .form-field__messages`);
  errorMessageElement.innerText = errMsg;
  if (show) {
    inputElement.classList.add('error');
    errorMessageElement.classList.remove('hidden');
  } else {
    inputElement.classList.remove('error');
    errorMessageElement.classList.add('hidden');
  }
}

// Toggle between signup screen and complete screen.
function toggleScreen() {
  signupScreen.classList.toggle('hidden');
  completeScreen.classList.toggle('hidden');
}