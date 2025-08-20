import clsx from "clsx";

type ButtonProps = {
  text: string;
  className?: string;
  disabled?: boolean;
}

export default function Button({ text, className, disabled, ...otherProps}: ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'disabled'>) {

  const btnClass = clsx(
    "py-(--space-s) rounded-(--space-2xs) border-0 text-(length:--step-1) leading-[1.5] font-bold",
    disabled
      ? "text-(--cl-btn-disabled-text) bg-(--cl-btn-disabled-bg)"
      : "text-(--cl-btn-text) bg-(--cl-btn-bg) "
  );
  return (
    <button
      className={clsx(btnClass, className)}
      disabled={disabled}
      {...otherProps}
    >
      {text}
    </button>
  );
}
