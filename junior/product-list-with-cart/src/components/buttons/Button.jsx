import styles from "./Button.module.scss";

export default function Button({
  text,
  icon,
  btnStyle,
  className,
  ...otherProps
}) {
  // Validation to ensure a valid style is used
  const isValidStyle = Object.values(BUTTON_STYLES).includes(btnStyle);
  const finalBtnStyle = isValidStyle ? btnStyle : BUTTON_STYLES.primary; // Fallback to a default

  return (
    <button
      className={[styles["btn"], styles["btn--" + finalBtnStyle], className]
        .filter(Boolean)
        .join(" ")}
      aria-label={text}
      type={!otherProps.type && "button"}
      {...otherProps}
    >
      {icon}
      <span className="button-text">{text}</span>
    </button>
  );
}

// Available button styles.
const BUTTON_STYLES = {
  primary: "primary",
  secondary: "secondary",
  // danger: "danger",
};
