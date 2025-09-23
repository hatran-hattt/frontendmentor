import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import illustrationEmpty from "@/assets/images/illustration-empty.svg"

const mainTextStyle = "text-(--cl-rlt-text-main) text-(length:--step-0) leading-[1.5] font-medium";
const boldTextStyle = "text-(--cl-rlt-text-bold) text-(length:--step-4) leading-[1.25] font-bold"
const largestTextStyle = "text-(--cl-rlt-accent) text-(length:--step-8) leading-[1.25] font-bold"

export type DataCalcResult = {rltMontly?: number, rltTotal?: number}

function CalcResult({data}: {data: DataCalcResult}) {

  if (!data || !data.rltMontly || !data.rltTotal) {
    return <CalcResutlEmpty/>;
  }

  // Format currency (Pound Sterling)
  const currencyFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  })
  
  return (
    <div className="grid px-(--space-m) py-(--space-l) gap-(--space-m) md:p-(--space-xl) md:gap-(--space-xl) bg-(--cl-rlt-bg)">
      <div className="grid gap-(--space-s)" >
        <h2 className={boldTextStyle}>Your results</h2>
        <p className={mainTextStyle}>Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
      </div>
      <div className={cn(
        "grid px-(--space-s) py-(--space-m) gap-(--space-s) rounded-(--space-2xs)",
        "bg-black/50 border-t-4 border-(--cl-rlt-accent)"
      )}>
        <div className="grid gap-(--space-2xs)">
          <p className={mainTextStyle}>Your monthly repayments</p>
          <p className={cn(largestTextStyle, "overflow-auto")}>{currencyFormatter.format(data.rltMontly)}</p>
        </div>
        <Separator className="bg-(--cl-rlt-line)" />
        <div className="grid gap-(--space-2xs)">
          <p className={mainTextStyle}>Total you'll repay over the term</p>
          <p className={cn(boldTextStyle, "overflow-auto")}>{currencyFormatter.format(data.rltTotal)}</p>
        </div>
      </div>
    </div>
  )
}

function CalcResutlEmpty() {
  return(
    <div className="grid px-(--space-m) py-(--space-l) md:p-(--space-xl) bg-(--cl-rlt-bg) lg:rounded-bl-[5rem]">
      <div className="flex flex-col gap-(--space-s) justify-center items-center text-center">
        <img alt="Results empty" src={illustrationEmpty} className="w-[12rem] h-[12rem]"/>
        <h2 className={boldTextStyle}>Results shown here</h2>
        <p className={mainTextStyle}>Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>
      </div>
    </div>
  )
}

export { CalcResult }