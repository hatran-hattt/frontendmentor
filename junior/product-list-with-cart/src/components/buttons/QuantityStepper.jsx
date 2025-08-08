import { SubtractIcon, AddIcon } from "../icons";
import styles from "./QuantityStepper.module.scss";

const QuantityStepper = ({
  currentQuantity,
  onSubtract,
  onAdd,
  ...otherProps
}) => {
  const { className: classNameProp, ...remainProps } = otherProps;

  return (
    <div
      className={[styles["wrapper"], classNameProp].filter(Boolean).join(" ")}
      {...remainProps}
    >
      <button
        className={`${styles["stepper-button"]} ${styles["left-button"]}`}
        onClick={onSubtract}
      >
        <SubtractIcon />
      </button>
      <div className={styles["quantity"]}>{currentQuantity}</div>
      <button
        className={`${styles["stepper-button"]} ${styles["left-button"]}`}
        onClick={onAdd}
      >
        <AddIcon />
      </button>
    </div>
  );
};

export default QuantityStepper;
