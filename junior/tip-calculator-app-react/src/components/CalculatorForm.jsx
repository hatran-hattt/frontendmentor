import { useRef, useEffect } from "react";
import TextField from "./forms/TextField";
import GroupRadioField from "./forms/GroupRadioField";
import styles from "./CalculatorForm.module.scss";
import { INPUT_FIELD_NAME } from "../constants/appConstants.js";

// Calculator Form
export default function CalculatorForm({
  input,
  validationRlt,
  onInputChange,
  focusCustomTipInput,
}) {
  return (
    <form className={styles["calc-form"]} id="calc-form" noValidate>
      <BillAmountInput
        value={input[INPUT_FIELD_NAME.BILL]}
        errMsg={validationRlt?.errors[INPUT_FIELD_NAME.BILL]?.join(" ")}
        onChange={onInputChange}
      />
      <TipGroupInput
        value={input[INPUT_FIELD_NAME.TIP]}
        customValue={input[INPUT_FIELD_NAME.TIP_CUSTOM]}
        errMsg={validationRlt?.errors[
          input[INPUT_FIELD_NAME.TIP] === "0"
            ? INPUT_FIELD_NAME.TIP_CUSTOM
            : INPUT_FIELD_NAME.TIP
        ]?.join(" ")}
        onChange={onInputChange}
        focusCustomTipInput={focusCustomTipInput}
      />
      <NumOfPeopleInput
        value={input[INPUT_FIELD_NAME.NUM_OF_PEOPLE]}
        errMsg={validationRlt?.errors[INPUT_FIELD_NAME.NUM_OF_PEOPLE]?.join(
          " "
        )}
        onChange={onInputChange}
      />
    </form>
  );
}

// Input Bill Amount
function BillAmountInput({ value, errMsg, onChange }) {
  const inputElementProps = {
    className: `${styles["txtbox"]} ${styles["hide-number-spinners"]}
                  ${styles["icon"]} ${styles["dollar"]}`,
    id: INPUT_FIELD_NAME.BILL,
    name: INPUT_FIELD_NAME.BILL,
    type: "number",
    step: "0.01",
    min: 0,
    placeholder: 0,
    inputMode: "decimal",
    value: value,
    onChange: onChange,
  };

  return (
    <TextField
      labelTxt="Bill"
      errMsg={errMsg}
      inputElementProps={inputElementProps}
    ></TextField>
  );
}

// Input Tip
function TipGroupInput({
  value,
  customValue,
  errMsg,
  onChange,
  focusCustomTipInput,
}) {
  const fixedTips = ["5", "10", "15", "25", "50"];
  let isCustomRadioSelected = value === "0";
  let dataRadios = fixedTips.map((tipValue) => ({
    id: `tip-${tipValue}`,
    labelTxt: `${tipValue}%`,
    value: tipValue,
  }));
  dataRadios.push({
    id: `tip-custom`,
    labelTxt: "Custom",
    value: "0",
    isHidden: isCustomRadioSelected,
    customElement: (
      <CustomTipInput
        value={customValue}
        onChange={onChange}
        isHidden={!isCustomRadioSelected}
        focusCustomTipInput={focusCustomTipInput}
      />
    ),
  });

  return (
    <GroupRadioField
      groupLabelTxt="Select Tip %"
      groupId="tip-radio-group"
      groupClassName={`${styles["group-radio"]}`}
      radioName={INPUT_FIELD_NAME.TIP}
      radioClassName={`${styles["radio__input"]} hidden`}
      radioLabelClassName={`${styles["radio__label"]}`}
      customRadioLabelClassName={`${styles["radio__label--custom"]}`}
      selectedRadioLabelClassName={`${styles["selected"]}`}
      dataRadios={dataRadios}
      selectedValue={value}
      onChange={onChange}
      errMsg={errMsg}
    />
  );
}

function CustomTipInput({ value, onChange, isHidden, focusCustomTipInput }) {
  const customTipInputRef = useRef(null);

  useEffect(() => {
    customTipInputRef?.current?.focus();
  }, [focusCustomTipInput]);

  return (
    <input
      className={`${styles["txtbox"]} ${styles["hide-number-spinners"]} ${
        isHidden ? "hidden" : ""
      }`}
      aria-label="Custom Tip"
      disabled={isHidden}
      type="number"
      id={INPUT_FIELD_NAME.TIP_CUSTOM}
      name={INPUT_FIELD_NAME.TIP_CUSTOM}
      placeholder={0}
      step="0.01"
      min={0}
      value={value}
      onChange={onChange}
      ref={customTipInputRef}
    />
  );
}

// Input Number of People
function NumOfPeopleInput({ value, errMsg, onChange }) {
  const inputElementProps = {
    className: `${styles["txtbox"]} ${styles["hide-number-spinners"]}
                  ${styles["icon"]} ${styles["person"]}`,
    id: INPUT_FIELD_NAME.NUM_OF_PEOPLE,
    name: INPUT_FIELD_NAME.NUM_OF_PEOPLE,
    type: "number",
    step: "1",
    min: 0,
    placeholder: 0,
    inputMode: "numeric",
    value: value,
    onChange: onChange,
  };

  return (
    <TextField
      labelTxt="Number of People"
      errMsg={errMsg}
      inputElementProps={inputElementProps}
    ></TextField>
  );
}
