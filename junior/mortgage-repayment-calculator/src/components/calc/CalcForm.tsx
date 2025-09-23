import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CalcButton } from "@/components/calc/CalcButton"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { CalculatorIcon } from "../icons"
import { CalcInput } from "./CalcInput"
import { CalcRadioGroup } from "./CalcRadioGroup"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { CaclFormSchema, FormDataDefault, INPUT_FIELD_NAME, MORTGAGE_TYPE, type FormData } from "@/types/form"
import { calculateInterestOnlyMonthlyRepayment, calculateInterestOnlyTotalRepayment, calculateMonthlyRepayment, calculateTotalRepayment } from "@/utils/repayment-formula"
import type { DataCalcResult } from "./CalcResult"


export function CalcForm({setCalcResult}: {setCalcResult: React.Dispatch<React.SetStateAction<DataCalcResult>>}) {
  const form = useForm<FormData>({
    // mode: "onChange",
    // @ts-expect-error (issue with optional input number)
    resolver: zodResolver(CaclFormSchema),
    defaultValues: {...FormDataDefault},
  })

  function onSubmit(data: FormData) {
    let monthlyRepayment = 0;
    if (data[INPUT_FIELD_NAME.TYPE] === MORTGAGE_TYPE.REPAYMENT) {
      monthlyRepayment = calculateMonthlyRepayment(data[INPUT_FIELD_NAME.AMOUNT] as number,
      data[INPUT_FIELD_NAME.INTEREST] as number,
        data[INPUT_FIELD_NAME.TERM]  as number)
    } else {
      monthlyRepayment = calculateInterestOnlyMonthlyRepayment(data[INPUT_FIELD_NAME.AMOUNT] as number,
      data[INPUT_FIELD_NAME.INTEREST] as number)
    }

    let totalRepayment = 0;
    if (data[INPUT_FIELD_NAME.TYPE] === MORTGAGE_TYPE.REPAYMENT) {
      totalRepayment = calculateTotalRepayment(monthlyRepayment,
        data[INPUT_FIELD_NAME.TERM]  as number)
    } else {
      totalRepayment = calculateInterestOnlyTotalRepayment(monthlyRepayment,
        data[INPUT_FIELD_NAME.TERM]  as number,
        data[INPUT_FIELD_NAME.AMOUNT]  as number)
    }

    setCalcResult({
      rltMontly: monthlyRepayment,
      rltTotal: totalRepayment
    })
    // toast("You submitted the following values", {
    //   description: (
    //     <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  const formLabelStyle = cn(
    "text-(--cl-form-label) text-(length:--step-0) leading-[1.5] font-medium",
    "data-[error=true]:text-(--cl-form-label)"
  )
  const formMessageStyle = "text-(--cl-input-error) text-(length:--step--1) leading-[1.5] font-medium"

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
      className={cn(
        "grid px-(--space-m) py-(--space-l) gap-(--space-m)",
        "md:p-(--space-xl) md:gap-(--space-xl)"
      )}>
        <header className={cn(
          "flex flex-col items-start gap-(--space-2xs)",
          "md:flex-row md:justify-between"
        )}>
          <h2 
            className="text-(--cl-main-text) text-(length:--step-4) leading-[1.25] font-bold">
            Mortgage Calculator
          </h2>
          <Button className="underline p-0 text-(--cl-subtle-text) text-(length:--step-0) leading-[1.5] font-medium"
            variant="link" onClick={() => {
              form.reset({...FormDataDefault})
              setCalcResult({})
            }}>
            Clear All
          </Button>
        </header>
        <div className="grid gap-(--space-m)">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={formLabelStyle}>Mortgage Amount</FormLabel>
                <FormControl>
                  <CalcInput {...field} value={field.value ?? ""} unitText="£" unitPosition="start" />
                </FormControl>
                <FormMessage className={formMessageStyle} />
              </FormItem>
            )}
          />
          <div className="grid gap-(--space-m) md:grid-cols-2">
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <div className="grid-rows-2">
                    <FormLabel className={formLabelStyle}>Mortgage Term</FormLabel>
                    <FormControl>
                      <CalcInput {...field} value={field.value ?? ""} unitText="years" unitPosition="end" />
                    </FormControl>
                  </div>
                  <FormMessage className={formMessageStyle} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <div className="grid-rows-2">
                    <FormLabel className={formLabelStyle}>Interest Rate</FormLabel>
                    <FormControl>
                      <CalcInput {...field} value={field.value ?? ""} unitText="%" unitPosition="end" />
                    </FormControl>
                  </div>
                  <FormMessage className={formMessageStyle} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className={formLabelStyle}>Mortgage Type</FormLabel>
                <FormControl>
                  <CalcRadioGroup 
                    dataRadios={[
                      {value: "repayment", text: "Repayment"},
                      {value: "interest-only", text: "Interest Only"}
                    ]}
                    value={field.value as string ?? ""} // TIPS: Solution to reset selection of RadioGroup when controlled state is reseted.
                    onValueChange={field.onChange}/>
                </FormControl>
                <FormMessage className={formMessageStyle} />
              </FormItem>
            )}
          />
        </div>
        <CalcButton type="submit">
          <CalculatorIcon className="size-6"/>Calculate Repayments
        </CalcButton>
      </form>
    </Form>
  )
}
