// ------------------- CONST - START --------------------

// Constants for common field validator.
export const COMMON_VALIDATORS = {
  email: validateEmail,
  // TODO
}

// Constants for common text input selectors
const TEXT_INPUT_SELECTORS = [
  'input[type="text"]',
  'input[type="email"]',
  'input[type="password"]',
  'input[type="url"]',
  'input[type="tel"]',
  'input[type="number"]',
  'textarea'
].join(', '); // Joins them into a single CSS selector string
// ------------------- CONST - END --------------------


// ------------------- PUBLIC FUNCTIONS - START --------------------
/**
 * Attaches a submit event listener to form for validation.
 * @param {HTMLFormElement} formElement - The form element.
 * @param {object} validations - An object mapping field names to validation functions.
 * @param {function} handleWhenFormValid - Callback function when the form is valid.
 * @param {function} handleWhenFormInvalid - Callback function when the form is invalid.
 */
export function attachValidationForForm(formElement, validations, handleWhenFormValid, handleWhenFormInvalid) {
  // 1. Create submit handler.
  const handleSubmit = function(e) {
    // Prevent default browser behaviour.
    e.preventDefault(e);
    
    // Validate form.
    let validationRlt = validateForm(e.target, validations);

    if (validationRlt.isValid) {
      if (handleWhenFormValid) {
        handleWhenFormValid();
      }
    } else {
      if (handleWhenFormInvalid) {
        handleWhenFormInvalid(validationRlt);
      }
    }
  }

  // 2. Attach submit handler to form.
  formElement.addEventListener('submit', handleSubmit);
}

/**
 * Attaches a blur event listener to all text input fields within a form for real-time validation.
 * @param {HTMLFormElement} formElement - The form element.
 * @param {object} validations - An object mapping field names to validation functions.
 * @param {function} handleWhenFormValid - Callback function when the field is valid.
 * @param {function} handleWhenFormInvalid - Callback function when the field is invalid.
 * @param {string} [selectorString=TEXT_INPUT_SELECTORS] - CSS selector string for text inputs.
 */
export function attachValidationForTextInputWhenBlur(formElement, validations, handleWhenFieldValid, handleWhenFieldInvalid, textInputSelectors = TEXT_INPUT_SELECTORS) {
  
  // 1. Get all text fields
  const allTextFields = formElement.querySelectorAll(textInputSelectors);
  if (allTextFields.length === 0) {
    return;
  }

  // 2. Create blur handler.
  const handleBlur = function(e) {
    const fieldName = e.target.name;
    const fieldValue = e.target.value.trim();

    let validationRlt = validateField(fieldName, fieldValue, validations);

    if (validationRlt.isValid) {
      if (handleWhenFieldValid) {
        handleWhenFieldValid(fieldName, fieldValue, validationRlt.errors);
      }
    } else {
      if (handleWhenFieldInvalid) {
        handleWhenFieldInvalid(fieldName, fieldValue, validationRlt.errors);
      }
    }
  }

  // 3. Attach blur handler to all text fields
  allTextFields.forEach(field => {
      field.addEventListener('blur', handleBlur);
  });
}

/**
 * Validates a single form field based on provided validation rules.
 * @param {string} name - The name of the field.
 * @param {string} value - The value of the field.
 * @param {object} validations - An object where keys are field names and values are validation functions.
 * @returns {{isValid: boolean, errors: string[]}} Validation result.
 */
export function validateField(name, value, validations) {
  // If no specific validation function is provided for this field, consider it valid by default.
  if (!validations[name] || typeof validations[name] !== 'function') {
    return { isValid: true, errors: [] };
  }
  
  // Call the specific validation function for the field
  return validations[name](value);
}

/**
 * Validates an entire form.
 * @param {HTMLFormElement} formElement - The form element to validate.
 * @param {object} validations - An object where keys are field names and values are validation functions.
 * @returns {{isValid: boolean, errors: object}} Validation result.
 */
export function validateForm(formElement, validations) {
  let formErrors = {};

  // Retrieving form data.
  const formData = Object.fromEntries(new FormData(formElement));

  // Iterate over all fields in the form data
  Object.keys(formData).forEach((fieldName) => {
    // Validate field
    const validationRlt = validateField(fieldName, formData[fieldName], validations);

    // Add errors of current field into formErrors object.
    if (!validationRlt.isValid) {
      formErrors[fieldName] = validationRlt.errors;
    }
  });

  return {
    isValid: Object.keys(formErrors).length === 0,
    errors: formErrors
  };
}

// ------------------- PUBLIC FUNCTIONS - END --------------------


// ------------------- PRIVATE FUNCTIONS - START --------------------
/**
 * Validates email address
 * @param {string} email - The email string to validate.
 * @returns {{isValid: boolean, errors: string[]}} Validation result.
 */
function validateEmail(email) {
  let errs = [];

  if (!email) {
    errs.push('Valid email required');
  } else {
    const isValidEmail = /^\S+@\S+\.\S+$/g;
    if (!isValidEmail.test(email)) {
      errs.push('Valid email required');
    }
  }

  return {
    isValid: errs.length === 0,
    errors: errs
  };
}
// ------------------- PRIVATE FUNCTIONS - END --------------------