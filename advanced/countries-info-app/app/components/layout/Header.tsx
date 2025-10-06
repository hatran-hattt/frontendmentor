import { ThemeProvider } from "~/context/ThemeContext";
import ThemeSwitch from "./ThemeSwitch";
import { cn } from "~/lib/utils";

export default function Header() {
  return (
    <ThemeProvider>
      <header className={cn(
        "flex flex-row justify-between px-(--space-s-5xl) py-(--space-l)",
        "bg-(--cl-card-bg) text-(--cl-text-main) shadow-sm overflow-visible",
        "fixed w-full z-10 top-0" // TIPS: use z-index to make shadow visible
      )}>
        <p>Where in the world?</p>
        <ThemeSwitch/>
      </header>
    </ThemeProvider>
  )
}