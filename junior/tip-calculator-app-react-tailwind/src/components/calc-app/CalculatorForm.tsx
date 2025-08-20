import { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import TextField from "../forms/TextField.jsx";
import GroupRadioField from "../forms/GroupRadioField.jsx";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { INPUT_FIELD_NAME, type InFormData } from "../../types/form.ts";

// Calculator Form
type CalculatorFormProps = {
  register: UseFormRegister<InFormData>;
  selectedTip: number | null | unknown;
  errors: FieldErrors<InFormData>;
};

export default function CalculatorForm({register, selectedTip, errors
}: CalculatorFormProps) {

  return (
    <form className="grid gap-(--space-2xl-3xl)" id="calc-form" noValidate>
      <BillAmountInput
        register={register}
        errMsg={errors[INPUT_FIELD_NAME.BILL]?.message}
      />
      <TipGroupInput
        register={register}
        selectedTip={selectedTip}
        errMsg={errors[INPUT_FIELD_NAME.TIP]?.message || errors[INPUT_FIELD_NAME.TIP_CUSTOM]?.message}
      />
      <NumOfPeopleInput
        register={register}
        errMsg={errors[INPUT_FIELD_NAME.NUM_OF_PEOPLE]?.message}
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

// Define a type for all valid inputMode values
type InputMode =
  | "search"
  | "text"
  | "email"
  | "tel"
  | "url"
  | "none"
  | "numeric"
  | "decimal"
  | undefined; // include undefined to make it optional


type BillAmountInputProps = {
  register: UseFormRegister<InFormData>;
  errMsg?: string;
};
// Input Bill Amount
function BillAmountInput({
  register,
  errMsg,
}: BillAmountInputProps) {
  const inputElementProps = {
    id: INPUT_FIELD_NAME.BILL,
    type: "number",
    step: "0.01",
    min: 0,
    placeholder: "0",
    inputMode: "decimal" as InputMode,
  };

  return (
    <TextField
      register={register}
      fieldName={INPUT_FIELD_NAME.BILL}
      labelTxt="Bill"
      errMsg={errMsg}
      inputElementProps={inputElementProps}
      className={clsx("hide-number-spinners",
        txtboxStyle,
        errMsg && txtboxErrStyle,
        txtboxIconStyle,
        "bg-[url('../assets/images/icon-dollar.svg')]"
      )}
    ></TextField>
  );
}

type TipGroupInputProps = {
  register: UseFormRegister<InFormData>;
  selectedTip: number | null | unknown;
  errMsg?: string;
};
// Input Tip
function TipGroupInput({
  register,
  selectedTip,
  errMsg,
}: TipGroupInputProps) {
  const [focusCustomTipInput, setFocusCustomTipInput] = useState(0);
  const isCustomRadioSelected = selectedTip == 0;
  function handleCustomRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
    // If custom radio is selected, focus custom tip input
    if (e.target.checked) {
      setFocusCustomTipInput((prev) => prev + 1);
    }
  }

  const fixedTips = [5, 10, 15, 25, 50];
  let dataRadios: Array<{
    id: string;
    labelTxt: string;
    value: number;
    isHidden?: boolean;
    onCustomRadioChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    customElement?: React.ReactNode | null;
  }> = fixedTips.map((tipValue) => ({
    id: `tip-${tipValue}`,
    labelTxt: `${tipValue}%`,
    value: tipValue,
  }));
  dataRadios.push({
    id: `tip-custom`,
    labelTxt: "Custom",
    value: 0,
    isHidden: isCustomRadioSelected,
    onCustomRadioChange: handleCustomRadioChange,
    customElement: (
      <CustomTipInput
        register={register}
        isHidden={!isCustomRadioSelected}
        focusCustomTipInput={focusCustomTipInput}
        errMsg={errMsg}
      />
    ),
  });

  return (
    <GroupRadioField
      register={register}
      fieldName={INPUT_FIELD_NAME.TIP}
      groupLabelTxt="Select Tip %"
      groupId="tip-radio-group"
      selectedValue={selectedTip}
      dataRadios={dataRadios}
      errMsg={errMsg}
    />
  );
}

type CustomTipInputProps = {
  register: UseFormRegister<InFormData>;
  isHidden: boolean;
  focusCustomTipInput: number;
  errMsg?: string;
};
function CustomTipInput({
  register,
  isHidden,
  focusCustomTipInput,
  errMsg,
}: CustomTipInputProps) {
  const customTipInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    customTipInputRef.current?.focus();
  }, [focusCustomTipInput]);

  const { ref, ...restProps } = register(INPUT_FIELD_NAME.TIP_CUSTOM);

  return (
    <input
      {...restProps}
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
      placeholder="0"
      step="0.01"
      min={0}
      ref={(e) => {
        ref(e);
        customTipInputRef.current = e;
      }}
    />
  );
}

type NumOfPeopleInputProps = {
  register: UseFormRegister<InFormData>;
  errMsg?: string;
};
// Input Number of People
function NumOfPeopleInput({
  register,
  errMsg,
}: NumOfPeopleInputProps) {
  const inputElementProps = {
    id: INPUT_FIELD_NAME.NUM_OF_PEOPLE,
    type: "number",
    step: "1",
    min: 0,
    placeholder: "0",
    inputMode: "numeric" as InputMode,
  };

  return (
    <TextField
      register={register}
      fieldName={INPUT_FIELD_NAME.NUM_OF_PEOPLE}
      labelTxt="Number of People"
      errMsg={errMsg}
      inputElementProps={inputElementProps}
      className={clsx(
        "hide-number-spinners",
        txtboxStyle,
        errMsg && txtboxErrStyle,
        txtboxIconStyle,
        "bg-[url('../assets/images/icon-person.svg')]"
      )}
    ></TextField>
  );
}
