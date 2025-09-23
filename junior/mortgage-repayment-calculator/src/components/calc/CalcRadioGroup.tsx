import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { RadioGroup } from "../ui/radio-group"
import { FormControl, FormItem, FormLabel } from "../ui/form";

function CalcRadioGroup({ dataRadios, ...props }: {dataRadios: Array<{ value: string; text: string }>} & React.ComponentProps<typeof RadioGroup> ) {
  return (
    <RadioGroup
      className="flex flex-col"
      { ...props }
    >
      {dataRadios.map((data) => (
        <FormItem className={cn(
            "flex items-center gap-(--space-s) px-(--space-s) py-(--space-xs) border border-(--cl-input-border) rounded-(--space-3xs)",
            "hover:border-(--cl-radio-border-hover)",
            "has-[[data-state=checked]]:bg-(--cl-radio-bg-active) has-[[data-state=checked]]:border-(--cl-input-border-active)"
          )}
          key={data.value}>
          <FormControl>
            <CalcRadioGroupItem value={data.value}/>
          </FormControl>
          <FormLabel className={cn(
            "text-(--cl-input-text) text-(length:--step-1) font-bold leading-[1.25]",
            "data-[error=true]:text-(--cl-input-text)"
          )}>
            {data.text}
          </FormLabel>
        </FormItem>
      ))}
    </RadioGroup>
    
  )
}

function CalcRadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        "text-(--cl-radio) border-(--cl-radio)",
        "data-[state=checked]:text-(--cl-radio-active) data-[state=checked]:border-(--cl-radio-active)",
        "aria-[invalid=true]:text-(--cl-radio) aria-[invalid=true]:border-(--cl-radio)",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon fill="currentColor" className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { CalcRadioGroup }
