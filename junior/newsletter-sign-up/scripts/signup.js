import { attachValidationForForm, attachValidationForTextInputWhenBlur, COMMON_VALIDATORS } from './my-form-validation.js';

// --------------- Main Process - Start --------------------------
let signupScreen = document.querySelector('.c-signup');
let completeScreen = document.querySelector('.c-signup-complete');
let signedUpEmailElement = document.getElementById('signedUpEmail');

let signupForm = signupScreen.querySelector('.c-signup form');
let emailInput = signupForm.querySelector('input[name="email"]');


// Define specific validations for signup form
// This object maps field 'name' attributes to their validation functions
const signupFormValidations = {
  email: COMMON_VALIDATORS.email,
}

attachValidationForForm(signupForm, signupFormValidations, handleWhenFormValid, handleWhenFormInvalid);
attachValidationForTextInputWhenBlur(signupForm, signupFormValidations, handleTextInputBlur, handleTextInputBlur);
completeScreen.querySelector('button').addEventListener('click', toggleScreen);
// --------------- Main Process - End --------------------------


// --------------- Event Handler - Start --------------------------
function handleWhenFormValid() {
  signedUpEmailElement.textContent = emailInput.value.trim();
  toggleScreen();
}

function handleWhenFormInvalid(validationRlt) {
  Object.keys(validationRlt.errors).forEach((key) => {
    toggleErrorMessage(key, validationRlt.errors[key]);
  });
}

function handleTextInputBlur(fieldName, _fieldValue, errors) {
  toggleErrorMessage(fieldName, errors);
}
// --------------- Event Handler - End --------------------------

// --------------- Other Functions - Start --------------------------
// Show/Hide error message for input field.
function toggleErrorMessage(fieldName, errors) {
  const inputElement = document.querySelector(`input[name="${fieldName}"]`);
  const errorMessageElement = document.querySelector(`.form-field:has(input[name="${fieldName}"]) .form-field__messages`);
  if (errors.length !== 0) {
    errorMessageElement.innerText = errors.join(' ');
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
// --------------- Other Functions - End --------------------------