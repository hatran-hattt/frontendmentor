import {useForm} from "react-hook-form";
import { CaclFormSchema, type OutFormData, FormInputDefault, INPUT_FIELD_NAME, type InFormData} from "../../types/form.ts";
import CalculatorForm from "./CalculatorForm";
import CalculatorResult from "./CalculatorResult";
import { roundUpToXDecimals } from "../../utils/calculation.js";
import clsx from "clsx";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CalculatorApp() {
  const {register, watch, getValues, reset, formState: {isValid, errors}} = useForm<InFormData, OutFormData>({
    defaultValues: FormInputDefault,
    mode: "onChange",
    resolver: zodResolver(CaclFormSchema)
  });
  
  let calculateRlt = {
    tipAmount: "$0.00",
    total: "$0.00",
  };
  if (isValid) {
    const result = CaclFormSchema.safeParse(getValues()); // Run the data through Zod again
    if (result.success) {
      const validatedData = result.data;
      calculateRlt = calculateResult(validatedData);
    }
  }

  // If there is at least one field inputed, enable btn reset.
    let shouldResetBtnEnable =
      (watch(INPUT_FIELD_NAME.BILL) ||
      watch(INPUT_FIELD_NAME.TIP) ||
      watch(INPUT_FIELD_NAME.TIP_CUSTOM)||
      watch(INPUT_FIELD_NAME.NUM_OF_PEOPLE)) ? true : false;
  
    function handleReset() {
      reset(FormInputDefault);
    }

  const selectedTip = watch(INPUT_FIELD_NAME.TIP);

  return (
    <div
      className={clsx(
        "grid grid-rows-[auto_auto] grid-cols-1 gap-(--space-2xl-3xl) max-w-[58rem]",
        "bg-(--cl-card-bg) py-(--space-2xl) px-(--space-xl)",
        "shadow-(color:--color-shadow] shadow-[0_0.25rem_1.5rem]",
        "rounded-t-2xl w-full",
        "sm:rounded-(--space-l) sm:w-4/5",
        "lg:grid-rows-1 lg:grid-cols-[10fr_11fr]"
      )}
    >
      <CalculatorForm
        register={register}
        selectedTip={selectedTip}
        errors={errors}
      />
      <CalculatorResult
        tipAmount={calculateRlt.tipAmount}
        total={calculateRlt.total}
        shouldResetBtnEnable={shouldResetBtnEnable}
        onReset={handleReset}
      />
    </div>
  );
}

function calculateResult(input: OutFormData) {
  let rlt = {
    tipAmount: "$0.00",
    total: "$0.00",
  };

  const billAmount = Number(input[INPUT_FIELD_NAME.BILL]);
  let tipPercentage = Number(input[INPUT_FIELD_NAME.TIP]);
  if (tipPercentage === 0) {
    tipPercentage = Number(input[INPUT_FIELD_NAME.TIP_CUSTOM]);
  }
  tipPercentage = tipPercentage ? Number(tipPercentage) : 0;
  const numOfPeople = Number(input[INPUT_FIELD_NAME.NUM_OF_PEOPLE]);

  // If billAmount or numofPeople are not entered, do not calculate the result.
  if (billAmount == 0 || numOfPeople == 0) {
    return rlt;
  }

  // If billAmount and numofPeople are entered, calculate the result.
  let tipAmount = roundUpToXDecimals((billAmount * tipPercentage) / 100, 2);
  let total = roundUpToXDecimals(
    (billAmount * (100 + tipPercentage)) / 100 / numOfPeople,
    2
  );

  // Update UI
  rlt.tipAmount = `$${tipAmount}`;
  rlt.total = `$${total}`;
  return rlt;
}
