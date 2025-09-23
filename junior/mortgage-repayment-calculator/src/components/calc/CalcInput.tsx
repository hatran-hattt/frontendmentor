import * as React from "react"

import { cn } from "@/lib/utils"

function CalcInput({ className, type, unitText, unitPosition, ...props }: React.ComponentProps<"input"> & {unitText?: string, unitPosition?: 'start' | 'end'} ) {
  const textStyle = "text-(length:--step-1) font-bold leading-[1.25]";
  const spanStyle = cn(
    "px-(--space-s) py-(--space-xs) text-(--cl-form-label) bg-(--cl-input-bg)",
    textStyle,
    // "has-[+input:focus]:bg-(--cl-input-bg-active)", // TIPS: Style for sibling that come before target (using adjacent Sibling Selector(+))
  )
  return (
    <div className={cn(
      "flex border border-(--cl-input-border) rounded-(--space-3xs) overflow-hidden",
      "hover:border-(--cl-input-border-hover)",
      "has-[input:focus]:border-(--cl-input-border-active)", // TIPS: use has-[input:focus] instead of focus-within in order to prefer focus than hover
      "has-[input:focus]:[&>span]:bg-(--cl-input-bg-active)", // TIPS: use the has selector on a common parent and then use a direct descendant selector ([&>span]: arbitrary variant) to apply the style to the span
      "has-[[aria-invalid=true]]:border-(--cl-input-error) has-[[aria-invalid=true]]:[&>span]:bg-(--cl-input-error) has-[[aria-invalid=true]]:[&>span]:text-(--cl-input-error-contrast)"
    )}>
      {(unitText && unitPosition === 'start') &&
        <span className={spanStyle}>
          {unitText}
        </span>}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "w-full outline-0 px-(--space-s)",
          "text-(--cl-form-text)",
          textStyle,
          // "selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          // "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          // "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {(unitText && unitPosition === 'end') &&
        <span className={spanStyle}>
          {unitText}
        </span>}
    </div>
    
  )
}

export { CalcInput }
