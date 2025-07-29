import { validateField, validateForm, attachValidationForTextInputWhenBlur } from './my-form-validation.js';
import { roundUpToXDecimals  } from './my-utils.js';

// --------------- Main Process - START --------------------------
const INPUT_FIELD_NAME = {
  BILL: 'bill',
  TIP: 'tip-percentage',
  TIP_CUSTOM: 'tip-custom-value',
  NUM_OF_PEOPLE: 'num-of-people'
};
const STR_ZERO_DOLLAR = '$0.00';
const calcForm = document.getElementById('calc-form');
const inBillElem = document.getElementById(INPUT_FIELD_NAME.BILL);
const inNumOfPeoElem = document.getElementById(INPUT_FIELD_NAME.NUM_OF_PEOPLE);
const inTipRadioGroup = document.getElementById('tip-radio-group');
const inCustomTipRadio = document.getElementById('tip-custom');
const inCustomTipValueElem = document.getElementById(INPUT_FIELD_NAME.TIP_CUSTOM);
const inCustomTipLabelElem = inTipRadioGroup.querySelector('label[for="tip-custom"]');

const outTipAmmountElem = document.getElementById('out-tip-ammount');
const outTotalElem = document.getElementById('out-total');

const resetBtn = document.getElementById('reset-btn');
let flagReseting = false;

// Define specific validations for signup form
// This object maps field 'name' attributes to their validation functions
const calcFormValidations = {};
calcFormValidations[INPUT_FIELD_NAME.BILL] = (value) => {return validateNumber(value, true, false, true)};
calcFormValidations[INPUT_FIELD_NAME.TIP] = (value) => {return validateNumber(value, true, false, false)};
calcFormValidations[INPUT_FIELD_NAME.TIP_CUSTOM] = (value) => {return validateNumber(value, true, false, false)};
calcFormValidations[INPUT_FIELD_NAME.NUM_OF_PEOPLE] = (value) => {return validateNumber(value, false, false, true)};

// Attach event handler
attachValidationForTextInputWhenBlur(calcForm, calcFormValidations, handleTextInputBlur, handleTextInputBlur);
inBillElem.addEventListener('change', validateFormAndCalculateResult);
inTipRadioGroup.addEventListener('change', handleTipRadioGroupChange);
inCustomTipValueElem.addEventListener('change', validateFormAndCalculateResult);
inNumOfPeoElem.addEventListener('change', validateFormAndCalculateResult);
resetBtn.addEventListener('click', handleReset);

// --------------- Main Process - END --------------------------

// --------------- Event Handlers - END --------------------------
function handleTextInputBlur(fieldName, _fieldValue, errors) {
  toggleErrorMessage(fieldName, errors);
}
function handleTipRadioGroupChange(e) {
  // Check if the event originated from a radio button within this group
  if (e.target.type === 'radio' && e.target.name === INPUT_FIELD_NAME.TIP) {
    const selectedRadio = e.target;
    const selectedValue = selectedRadio.value;
    const selectedId = selectedRadio.id;
    
    // Update selected radio style
    const selectedLabel = inTipRadioGroup.querySelector(`label[for="${selectedId}"]`);
    selectedLabel.classList.add('selected');
    inTipRadioGroup.querySelectorAll(`label:not([for="${selectedId}"])`).forEach((label) => {
      label.classList.remove('selected');
    });

    // If custom tip radio is selected
    if (!selectedValue) {
      // Show custom tip input & hide custom label
      inCustomTipValueElem.classList.remove('hidden');
      inCustomTipValueElem.disabled = false;
      selectedRadio.disabled = true;
      inCustomTipValueElem.focus();
      inCustomTipLabelElem.classList.add('hidden');
    } else {
      
      
      inCustomTipValueElem.value = '';
      inCustomTipValueElem.classList.add('hidden');
      inCustomTipValueElem.disabled = true;
      inCustomTipRadio.disabled = false;
      inCustomTipLabelElem.classList.remove('hidden');
    }
    let validationRlt = validateField(INPUT_FIELD_NAME.TIP, selectedValue, calcFormValidations);
    toggleErrorMessage(INPUT_FIELD_NAME.TIP, validationRlt.errors);
    validateFormAndCalculateResult();
  }
}

function handleReset() {
  if(flagReseting) return;

  flagReseting = true;

  // Clear inputs
  inBillElem.value = '';
  inNumOfPeoElem.value = '';
  resetRadioGroup();

  // Remove error msgs
  toggleErrorMessage(INPUT_FIELD_NAME.BILL, []);
  toggleErrorMessage(INPUT_FIELD_NAME.TIP, []);
  toggleErrorMessage(INPUT_FIELD_NAME.TIP_CUSTOM, []);
  toggleErrorMessage(INPUT_FIELD_NAME.NUM_OF_PEOPLE, []);
  

  // Clear results
  outTipAmmountElem.textContent = STR_ZERO_DOLLAR;
  outTotalElem.textContent = STR_ZERO_DOLLAR;


  flagReseting = false;
}

function validateFormAndCalculateResult() {
  if(flagReseting) return;

  // Validate input.
  let validationRlt = validateForm(calcForm, calcFormValidations);
  if (!validationRlt.isValid) {
    // Clear results
    outTipAmmountElem.textContent = STR_ZERO_DOLLAR;
    outTotalElem.textContent = STR_ZERO_DOLLAR;
    return;
  }

  // Retrive input data
  const data = Object.fromEntries(new FormData(calcForm));
  const billAmount = Number(data[INPUT_FIELD_NAME.BILL]);
  let tipPercentage = data[INPUT_FIELD_NAME.TIP];
  if (!tipPercentage) {
    tipPercentage = data[INPUT_FIELD_NAME.TIP_CUSTOM];
  }
  tipPercentage = tipPercentage ? Number(tipPercentage) : 0;
  const numOfPeople = Number(data[INPUT_FIELD_NAME.NUM_OF_PEOPLE]);

  // If all fields are not inputed, disable btn reset.
  if (billAmount == 0 && numOfPeople == 0 && tipPercentage == 0) {
    resetBtn.disabled = true;
  } else {
    resetBtn.disabled = false;
  }

  // If billAmount or numofPeople are not entered, do not calculate the result.
  if (billAmount == 0 || numOfPeople == 0) {
    return;
  }

  // If billAmount and numofPeople are entered, calculate the result.
  let tipAmmount = roundUpToXDecimals((billAmount * tipPercentage) / 100, 2);
  let total = roundUpToXDecimals((billAmount * ( 100 + tipPercentage) / 100) / numOfPeople, 2);

  // Update UI
  outTipAmmountElem.textContent = `\$${tipAmmount}`;
  outTotalElem.textContent = `\$${total}`;

}
// --------------- Event Handlers - END --------------------------



function validateNumber(value, allowDecimal = true, isRequired = false, notZero = false) {
  let errs = [];


  if (!value || value.toString().trim() === '') {
    if (isRequired) {
      errs.push("Can't be empty");
    }
  } else {
    if (isNaN(value)) {
      errs.push("Only enter number");
    } else {
      const num = Number(value);
      if (num < 0) {
        errs.push("Can't be negative");
      } else if (notZero && num == 0) {
        errs.push("Can't be zero");
      } else if (!allowDecimal && !Number.isInteger(num)) {
        errs.push("Only enter whole number");
      }
    } 
  }

  return {
    isValid: errs.length === 0,
    errors: errs
  };
}


// ---------Handle UI
// Show/Hide error message for input field.
function toggleErrorMessage(fieldName, errors) {
  const inputElement = document.querySelector(`input[name="${fieldName}"]`);
  const errorMessageElement = document.querySelector(`.form-field:has(input[name="${fieldName}"]) .messages`);
  if (errors.length !== 0) {
    errorMessageElement.innerText = errors.join(' ');
    inputElement.classList.add('error');
    errorMessageElement.classList.remove('hidden');
  } else {
    inputElement.classList.remove('error');
    errorMessageElement.classList.add('hidden');
  }
}

function resetRadioGroup() {

  const radios = inTipRadioGroup.querySelectorAll('input[type="radio"]');
  const labels = inTipRadioGroup.querySelectorAll('label');

  radios.forEach(radio => {
    radio.checked = false;
  });
  labels.forEach(label => {
    label.classList.remove('selected');
  });

  inCustomTipRadio.disabled = false;
  inCustomTipValueElem.disabled = true;
  inCustomTipValueElem.value = '';
  inCustomTipValueElem.classList.add('hidden');
  inCustomTipLabelElem.classList.remove('hidden');
  
  resetBtn.disabled = true;

  // TODO
  // If you have any custom active/selected styling on labels,
  // you might need to remove a corresponding class here as well.
  // E.g., const labels = document.querySelectorAll(`label[for^="${groupName}"]`);
  // labels.forEach(label => label.classList.remove('is-selected'));
}