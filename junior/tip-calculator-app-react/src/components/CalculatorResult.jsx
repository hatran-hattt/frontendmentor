import styles from "./CalculatorResult.module.scss";
import Button from "./buttons/Button";

// Calculator Form
export default function CalculatorResult({
  tipAmount,
  total,
  shouldResetBtnEnable,
  onReset,
}) {
  return (
    <div className={styles["calc-result"]}>
      <div>
        <Info mainTxt="Tip Amount" subtleTxt="/ person" value={tipAmount} />
        <Info mainTxt="Total" subtleTxt="/ person" value={total} />
      </div>
      <Button
        text="RESET"
        type="button"
        disabled={!shouldResetBtnEnable}
        onClick={onReset}
      />
    </div>
  );
}

// Input Bill Amount
function Info({ mainTxt, subtleTxt, value }) {
  return (
    <div className={styles["info"]}>
      <div className={styles["info-name"]}>
        <p className={styles["info-name__main"]}>{mainTxt}</p>
        <p className={styles["info-name__subtle"]}>{subtleTxt}</p>
      </div>
      <p className={styles["info-value"]}>{value}</p>
    </div>
  );
}
