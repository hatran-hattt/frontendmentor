import clsx from "clsx";
import FormField from "./FormField";

export default function GroupRadioField({
  groupLabelTxt,
  groupId,
  radioName,
  dataRadios,
  selectedValue,
  onChange,
  errMsg = null,
}) {
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
                labelTxt={radio.labelTxt}
                id={radio.id}
                name={radioName}
                value={radio.value}
                checked={radio.value === selectedValue}
                onChange={onChange}
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

function RadioField({
  labelTxt,
  id,
  name,
  value,
  checked,
  customElement,
  onChange,
  hideRadio,
}) {
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

  return (
    <div>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className="peer sr-only"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className={labelClassName}>
        {labelTxt}
      </label>
      {customElement}
    </div>
  );
}
