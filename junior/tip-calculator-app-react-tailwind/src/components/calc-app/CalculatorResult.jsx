import Button from "../buttons/Button";

// Calculator Form
export default function CalculatorResult({
  tipAmount,
  total,
  shouldResetBtnEnable,
  onReset,
}) {
  return (
    <div className="flex flex-col justify-between gap-(--space-2xl-8xl) rounded-(--space-l) bg-(--cl-info-bg) p-(--space-l)">
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
    <div className="flex justify-between items-center">
      <div>
        <p className="text-(--cl-info-name-txt-main) font-bold text-(length:--step-0) leading-[1.5] tracking-normal">
          {mainTxt}
        </p>
        <p className="text-(--cl-info-name-txt-subtle) font-bold text-(length:--step--1) leading-[1.46] tracking-normal">
          {subtleTxt}
        </p>
      </div>
      <p className="text-(--cl-info-value) font-bold text-(length:--step-4) leading-[1.48] tracking-[-0.02]">
        {value}
      </p>
    </div>
  );
}
