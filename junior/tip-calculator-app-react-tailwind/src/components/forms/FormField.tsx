import clsx from "clsx";

type FormFieldProps = {
  labelTxt: string;
  labelFor?: string;
  labelledBy?: string;
  renderInput: (props: { className: string }) => React.ReactNode;
  errMsg?: string | null;
};

export default function FormField({
  labelTxt,
  labelFor,
  labelledBy,
  renderInput,
  errMsg = null,
}: FormFieldProps) {
  // Text style
  const textStyle = "font-bold text-(length:--step-0) leading-[1.5]";

  // Grid
  const wrapperStyle =
    "grid grid-cols-[auto_auto] grid-rows-[auto_auto] gap-(--space-2xs)";

  // Grid row and column placement
  const labelStyle = clsx(
    "row-start-1 col-start-1 text-(--cl-field-label)",
    textStyle
  );
  const messageStyle = clsx(
    "row-start-1 col-start-2 justify-self-end self-start text-(--cl-field-input-error-msg)",
    textStyle,
    !errMsg && "hidden"
  );
  const inputStyle = "row-start-2 col-span-2";

  // Create label that adapt accessibility
  const labelElement = labelFor ? (
    <label className={labelStyle} htmlFor={labelFor}>
      {labelTxt}
    </label>
  ) : (
    <div className={labelStyle} id={labelledBy}>
      {labelTxt}
    </div>
  );

  return (
    <div className={wrapperStyle}>
      {labelElement}
      {renderInput({ className: inputStyle })}
      <div className={messageStyle}>{errMsg}</div>
    </div>
  );
}
