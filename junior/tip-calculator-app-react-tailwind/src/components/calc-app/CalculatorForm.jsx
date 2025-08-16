import { useRef, useEffect } from "react";
import clsx from "clsx";
import TextField from "../forms/TextField.jsx";
import GroupRadioField from "../forms/GroupRadioField.jsx";
import { INPUT_FIELD_NAME } from "../../constants/appConstants.js";

// Calculator Form
export default function CalculatorForm({
  input,
  validationRlt,
  onInputChange,
  focusCustomTipInput,
}) {
  return (
    <form className="grid gap-(--space-2xl-3xl)" id="calc-form" noValidate>
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

const textStyle =
  "font-base font-bold text-(length:--step-1) leading-[1.5] tracking-normal";
const txtboxStyle = clsx(
  "w-full border-0 outline-0 rounded-(--space-3xs) text-right p-(--space-s)",
  textStyle,
  "text-(--cl-field-input-text) bg-(--cl-field-input-bg)",
  "focus:border-2 focus:border-(--cl-field-input-focus-border)",
  "focus-visible:border-2 focus-visible:border-(--cl-field-input-focus-border)"
);
const txtboxErrStyle = "border-2 border-(--cl-field-input-error-border)!";
const txtboxIconStyle = "bg-auto bg-no-repeat bg-[left_var(--space-s)_center]"; // TIPS: Place image x size unit from right side.

// Input Bill Amount
function BillAmountInput({ value, errMsg, onChange }) {
  const inputElementProps = {
    className: clsx(
      "hide-number-spinners",
      txtboxStyle,
      errMsg && txtboxErrStyle,
      txtboxIconStyle,
      "bg-[url('../assets/images/icon-dollar.svg')]"
    ),
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
        errMsg={errMsg}
      />
    ),
  });

  const radioLabelBaseStyle = clsx(
    "block text-center outline-0 cursor-pointer p-(--space-s) rounded-(--space-3xs)",
    textStyle,
    "text-(--cl-field-radio-text) bg-(--cl-field-radio-bg)",
    "peer-focus-visible:border-2 peer-focus-visible:text-(--cl-field-input-focus-border)",
    "peer-hover:text-[var(--cl-field-radio-selected-text)] peer-hover:bg-[var(--cl-field-radio-selected-bg)]"
  );

  return (
    <GroupRadioField
      radioName={INPUT_FIELD_NAME.TIP}
      className="p-(--space-s) rounded-(--space-3xs)"
      groupLabelTxt="Select Tip %"
      groupId="tip-radio-group"
      groupClassName="grid grid-cols-2 md:grid-cols-3 gap-(--space-s)"
      radioClassName="peer sr-only"
      radioLabelBaseClassName={radioLabelBaseStyle}
      customRadioLabelClassName="text-(--cl-field-radio-custom-text) bg-(--cl-field-radio-custom-bg)"
      selectedRadioLabelClassName="text-(--cl-field-radio-selected-text) bg-(--cl-field-radio-selected-bg)"
      dataRadios={dataRadios}
      selectedValue={value}
      onChange={onChange}
      errMsg={errMsg}
    />
  );
}

function CustomTipInput({
  value,
  onChange,
  isHidden,
  focusCustomTipInput,
  errMsg,
}) {
  const customTipInputRef = useRef(null);

  useEffect(() => {
    customTipInputRef?.current?.focus();
  }, [focusCustomTipInput]);

  return (
    <input
      className={clsx(
        "hide-number-spinners",
        txtboxStyle,
        errMsg && txtboxErrStyle,
        isHidden && "hidden"
      )}
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
    className: clsx(
      "hide-number-spinners",
      txtboxStyle,
      errMsg && txtboxErrStyle,
      txtboxIconStyle,
      "bg-[url('../assets/images/icon-person.svg')]"
    ),
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
