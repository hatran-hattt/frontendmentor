import FormField from "./FormField";

export default function GroupRadioField({
  groupLabelTxt,
  groupId,
  groupClassName,
  radioName,
  radioClassName,
  radioLabelClassName,
  customRadioLabelClassName,
  selectedRadioLabelClassName,
  dataRadios,
  selectedValue,
  onChange,
  errMsg = null,
}) {
  // Radio fields
  const listRadio = dataRadios.map((radio) => {
    let checked = radio.value === selectedValue;
    return (
      <RadioField
        key={radio.id}
        labelTxt={radio.labelTxt}
        id={radio.id}
        name={radioName}
        value={radio.value}
        checked={checked}
        onChange={onChange}
        radioClassName={radioClassName}
        labelClassName={`${radioLabelClassName} ${
          radio.customElement ? customRadioLabelClassName : ""
        } ${checked ? selectedRadioLabelClassName : ""} ${
          radio.isHidden ? "hidden" : ""
        }`}
        customElement={radio.customElement}
      />
    );
  });

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
          className={
            [
              inputProps.className, // Class from FormField's renderInput
              groupClassName, // Class from TextField's inputElementProps
            ]
              .filter(Boolean)
              .join(" ") // Filter out falsy values (null, undefined, '') then join with space
          }
        >
          {listRadio}
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
  radioClassName,
  labelClassName,
  customElement,
  onChange,
}) {
  return (
    <div>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className={radioClassName}
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
