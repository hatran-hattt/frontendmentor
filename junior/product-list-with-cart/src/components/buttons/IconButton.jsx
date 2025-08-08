import styles from "./IconButton.module.scss";

const IconButton = ({
  icon,
  ariaLabel,
  shape,
  size,
  color,
  className,
  ...props
}) => {
  let iconBorderRadius = shape == BUTTON_STYLES.round ? "50%" : "";
  let iconSize = size ?? "1.25rem";
  let iconColor = color ?? "white";

  return (
    <button
      className={[styles["icon-btn"], className].filter(Boolean).join(" ")}
      style={{
        borderRadius: iconBorderRadius,
        width: iconSize,
        height: iconSize,
        color: iconColor,
      }}
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </button>
  );
};

// Available button shapes.
const BUTTON_STYLES = {
  round: "round",
  square: "square",
  // danger: "danger",
};

export default IconButton;
