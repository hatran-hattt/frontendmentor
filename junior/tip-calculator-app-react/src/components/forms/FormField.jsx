import styles from "./FormField.module.scss";

export default function FormField({
  labelTxt,
  labelFor,
  labelledBy,
  renderInput,
  customStyle = null,
  errMsg = null,
}) {
  // Styles
  const wrapperStyle = [customStyle?.wrapper ?? styles["form-field"]];
  const labelStyle = [customStyle?.label ?? styles["area-label"]];
  const inputStyle = [customStyle?.input ?? styles["area-input"]];
  const messageStyle = [
    customStyle?.message ??
      `${styles["area-message"]} ${errMsg ? "" : "hidden"}`,
  ];

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
