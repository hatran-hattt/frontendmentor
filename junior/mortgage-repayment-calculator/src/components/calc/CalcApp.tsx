import { useState } from "react"
import { CalcForm } from "./CalcForm"
import { CalcResult, type DataCalcResult } from "./CalcResult"

function CalcApp() {

  const [calcResult, setCalcResult] = useState<DataCalcResult>({});

  return (
    <div className="grid max-w-[63rem] md:rounded-(--space-m) lg:grid-cols-2 overflow-hidden bg-(--cl-card-bg)">
      <CalcForm setCalcResult={setCalcResult}/>
      <CalcResult data={calcResult}/>
    </div>
  )
}

export { CalcApp }