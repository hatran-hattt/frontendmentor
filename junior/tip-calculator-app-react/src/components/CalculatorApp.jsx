import { useState } from "react";
import CalculatorForm from "./CalculatorForm";
import CalculatorResult from "./CalculatorResult";
import styles from "./CalculatorApp.module.scss";
import { INPUT_FIELD_NAME } from "../constants/appConstants.js";
import {
  COMMON_VALIDATORS,
  validateInput,
} from "../utils/my-form-validation.js";

import { roundUpToXDecimals } from "../utils/calculation.js";

export default function CalculatorApp() {
  const [input, setInput] = useState({ ...inputEmpty });
  const [focusCustomTipInput, setFocusCustomTipInput] = useState(0);

  // If there is at least one field inputed, enable btn reset.
  let shouldResetBtnEnable =
    input[INPUT_FIELD_NAME.BILL] ||
    input[INPUT_FIELD_NAME.TIP] ||
    input[INPUT_FIELD_NAME.TIP_CUSTOM] ||
    input[INPUT_FIELD_NAME.NUM_OF_PEOPLE];

  // Validate input
  let validationRlt = validateInput(input, calcFormValidations);
  let calculateRlt = {
    tipAmount: "$0.00",
    total: "$0.00",
  };
  if (validationRlt.isValid) {
    calculateRlt = calculateResult(input);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    let newInput = { ...input, [name]: value };

    // If custom radio is selected, focus custom tip input
    if (name === INPUT_FIELD_NAME.TIP) {
      if (value === "0") {
        setFocusCustomTipInput((prev) => prev + 1);
      } else {
        newInput[INPUT_FIELD_NAME.TIP_CUSTOM] = "";
      }
    }

    // Update input
    setInput(newInput);
  }

  function handleReset() {
    setInput({ ...inputEmpty });
  }

  return (
    <div className={styles["calc-app"]}>
      <CalculatorForm
        input={input}
        validationRlt={validationRlt}
        onInputChange={handleInputChange}
        focusCustomTipInput={focusCustomTipInput}
      />
      <CalculatorResult
        tipAmount={calculateRlt.tipAmount}
        total={calculateRlt.total}
        shouldResetBtnEnable={shouldResetBtnEnable}
        onReset={handleReset}
      />
    </div>
  );
}

const calcFormValidations = {
  [INPUT_FIELD_NAME.BILL]: (value) => {
    return COMMON_VALIDATORS.number(value, true, false, true);
  },
  [INPUT_FIELD_NAME.TIP]: (value) => {
    return COMMON_VALIDATORS.number(value, true, false, false);
  },
  [INPUT_FIELD_NAME.TIP_CUSTOM]: (value) => {
    return COMMON_VALIDATORS.number(value, true, false, false);
  },
  [INPUT_FIELD_NAME.NUM_OF_PEOPLE]: (value) => {
    return COMMON_VALIDATORS.number(value, false, false, true);
  },
};

const inputEmpty = {
  [INPUT_FIELD_NAME.BILL]: "",
  [INPUT_FIELD_NAME.TIP]: "",
  [INPUT_FIELD_NAME.TIP_CUSTOM]: "",
  [INPUT_FIELD_NAME.NUM_OF_PEOPLE]: "",
};

function calculateResult(input) {
  let rlt = {
    tipAmount: "$0.00",
    total: "$0.00",
  };

  const billAmount = Number(input[INPUT_FIELD_NAME.BILL]);
  let tipPercentage = input[INPUT_FIELD_NAME.TIP];
  if (tipPercentage === "0") {
    tipPercentage = input[INPUT_FIELD_NAME.TIP_CUSTOM];
  }
  tipPercentage = tipPercentage ? Number(tipPercentage) : 0;
  const numOfPeople = Number(input[INPUT_FIELD_NAME.NUM_OF_PEOPLE]);

  // If billAmount or numofPeople are not entered, do not calculate the result.
  if (billAmount == 0 || numOfPeople == 0) {
    return rlt;
  }

  // If billAmount and numofPeople are entered, calculate the result.
  let tipAmount = roundUpToXDecimals((billAmount * tipPercentage) / 100, 2);
  let total = roundUpToXDecimals(
    (billAmount * (100 + tipPercentage)) / 100 / numOfPeople,
    2
  );

  // Update UI
  rlt.tipAmount = `$${tipAmount}`;
  rlt.total = `$${total}`;
  return rlt;
}
