import clsx from "clsx";
export default function Button({ text, ...otherProps }) {
  const { className: classNameProp, disabled, ...remainProps } = otherProps;

  const btnClass = clsx(
    "py-(--space-s) rounded-(--space-2xs) border-0 text-(length:--step-1) leading-[1.5] font-bold",
    disabled
      ? "text-(--cl-btn-disabled-text) bg-(--cl-btn-disabled-bg)"
      : "text-(--cl-btn-text) bg-(--cl-btn-bg) "
  );
  return (
    <button
      className={[btnClass, classNameProp].filter(Boolean).join(" ")}
      disabled={disabled}
      {...remainProps}
    >
      {text}
    </button>
  );
}
