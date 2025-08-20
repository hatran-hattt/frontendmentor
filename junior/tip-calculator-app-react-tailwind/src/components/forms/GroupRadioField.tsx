import clsx from "clsx";
import FormField from "./FormField";
import type { UseFormRegister } from "react-hook-form";
import type { InFormData } from "../../types/form";

type RadioData = {
  id: string;
  labelTxt: string;
  value: number;
  customElement?: React.ReactNode;
  onCustomRadioChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isHidden?: boolean;
};

type GroupRadioFieldProps = {
  register: UseFormRegister<InFormData>;
  fieldName: string;
  groupLabelTxt: string;
  groupId: string;
  dataRadios: RadioData[];
  selectedValue: number | null | unknown;
  errMsg?: string | null;
};

export default function GroupRadioField({
  register,
  fieldName,
  groupLabelTxt,
  groupId,
  dataRadios,
  selectedValue,
  errMsg,
}: GroupRadioFieldProps) {
  // Group Radio
  return (
    <FormField
      labelTxt={groupLabelTxt}
      labelledBy={`label-${groupId}`}
      errMsg={errMsg}
      renderInput={(inputProps) => (
        <div
          id={groupId}
          role="radiogroup"
          aria-labelledby={`label-${groupId}`}
          className={clsx(
            inputProps.className, // Class from FormField's renderInput
            "grid grid-cols-2 md:grid-cols-3 gap-(--space-s)"
          )}
        >
          {/* Radio fields */}
          {dataRadios.map((radio) => {
            return (
              <RadioField
                key={radio.id}
                register={register}
                fieldName={fieldName}
                labelTxt={radio.labelTxt}
                id={radio.id}
                value={radio.value}
                checked={radio.value == selectedValue}
                onCustomRadioChange={radio.onCustomRadioChange}
                customElement={radio.customElement}
                hideRadio={radio.isHidden}
              />
            );
          })}
        </div>
      )}
    />
  );
}

type RadioFieldProps = {
  register: UseFormRegister<InFormData>;
  fieldName: string;
  labelTxt: string;
  id: string;
  value: number;
  checked: boolean;
  customElement?: React.ReactNode;
  onCustomRadioChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hideRadio?: boolean;
};

function RadioField({
  register,
  fieldName,
  labelTxt,
  id,
  value,
  checked,
  customElement,
  onCustomRadioChange,
  hideRadio,
}: RadioFieldProps) {
  const labelClassName = clsx(
    "block text-center outline-0 cursor-pointer p-(--space-s) rounded-(--space-3xs)",
    "font-base font-bold text-(length:--step-1) leading-[1.5] tracking-normal",
    "peer-focus-visible:border-2 peer-focus-visible:border-(--cl-field-input-focus-border)",
    "peer-hover:text-[var(--cl-field-radio-selected-text)] peer-hover:bg-[var(--cl-field-radio-selected-bg)]",
    checked
      ? "text-(--cl-field-radio-selected-text) bg-(--cl-field-radio-selected-bg)"
      : customElement
      ? "text-(--cl-field-radio-custom-text) bg-(--cl-field-radio-custom-bg)"
      : "text-(--cl-field-radio-text) bg-(--cl-field-radio-bg)",

    hideRadio && "hidden"
  );

  const {onChange, ...restProps} = register(fieldName);

  return (
    <div>
      <input
        {...restProps}
        type="radio"
        id={id}
        value={value}
        className="peer sr-only"
        onChange={(e) => {
          onChange(e);
          if (onCustomRadioChange) {
            onCustomRadioChange(e);
          }
        }}
      />
      <label htmlFor={id} className={labelClassName}>
        {labelTxt}
      </label>
      {customElement}
    </div>
    
  );
}
