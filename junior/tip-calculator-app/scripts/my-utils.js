// --------- LOGIC
export function roundUpToXDecimals(num, decimalPlaces) {
  if (typeof num !== 'number' || typeof decimalPlaces !== 'number' || decimalPlaces < 0 || !Number.isInteger(decimalPlaces)) {
    console.error("Invalid input: 'num' must be a number and 'decimalPlaces' must be a non-negative integer.");
    return NaN; // Or throw an error, depending on desired error handling
  }

  // Calculate the multiplier (10 raised to the power of decimalPlaces)
  const multiplier = Math.pow(10, decimalPlaces);

  // 1. Multiply the number by the multiplier to shift the decimal
  //    Example: 142.553, 2 decimalPlaces -> 14255.3
  //    Example: 123.4567, 3 decimalPlaces -> 123456.7
  const multipliedNum = num * multiplier;

  // 2. Use Math.ceil() to round up to the nearest whole number.
  //    Example: 14255.3 becomes 14256
  //    Example: 123456.7 becomes 123457
  const roundedUpNum = Math.ceil(multipliedNum);

  // 3. Divide by the multiplier to shift the decimal back.
  //    Example: 14256 becomes 142.56
  //    Example: 123457 becomes 123.457
  const result = roundedUpNum / multiplier;

  // Optional: To ensure it always has the specified number of decimal places
  // This converts the number to a string and formats it.
  return result.toFixed(decimalPlaces);
}


// ------------ UI

// function clearRadioGroup(groupName) {
//   const radios = document.querySelectorAll(`input[type="radio"][name="${groupName}"]`);

//   radios.forEach(radio => {
//     radio.checked = false;
//   });
// }