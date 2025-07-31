import FormField from "./FormField";

export default function TextField({
  labelTxt,
  errMsg = null,
  inputElementProps,
}) {
  const { className: inputElementClassName, ...restInputElementProps } =
    inputElementProps;
  return (
    <FormField
      labelTxt={labelTxt}
      labelFor={inputElementProps.id}
      errMsg={errMsg}
      renderInput={(inputProps) => (
        <input
          className={
            [
              inputProps.className, // Class from FormField's renderInput
              inputElementClassName, // Class from TextField's inputElementProps
            ]
              .filter(Boolean)
              .join(" ") // Filter out falsy values (null, undefined, '') then join with space
          }
          {...restInputElementProps} // Pass the rest of the props
        />
      )}
    />
  );
}
