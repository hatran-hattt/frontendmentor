import styles from "./Button.module.scss";

export default function Button({ text, ...otherProps }) {
  const { className: classNameProp, ...remainProps } = otherProps;

  return (
    <button
      className={[styles["button"], classNameProp].filter(Boolean).join(" ")}
      {...remainProps}
    >
      {text}
    </button>
  );
}
