import { createContext, useContext, useEffect, useState } from "react";
import { type ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "system"
const STORAGE_KEY_CURRENT_THEME = "countries-info-app-current-theme"
type ThemeContextType = {
  theme: ThemeMode | null;
  changeTheme: Function;
}

// 1. Create a Context that
// - Provider component: will provide it
// - Component that wrapped by Provider: will get and use it
const ThemeContext = createContext<ThemeContextType | null>(null);

// 2. Create a Provide component that will wrap around app/section that need to use Context
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode | null>(null);

  // Initial: get theme from localStorage
  useEffect(() => {
    setTheme(localStorage.getItem(STORAGE_KEY_CURRENT_THEME) as ThemeMode)
  }, [])

  // When theme state has been changed: update classList of html
  useEffect(() => {
    const root = window.document.documentElement
 
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
 
      root.classList.add(systemTheme)
      return
    }

    if (theme) {root.classList.add(theme)}
  }, [theme])

  // Provide handler for changing theme
  const changeTheme = (targetTheme: ThemeMode) => {
    localStorage.setItem(STORAGE_KEY_CURRENT_THEME, targetTheme)
    setTheme(targetTheme)
  }

  const contextValue = {theme, changeTheme}
  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

// 3. Create a custom hook for easy useNavigate
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if(context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}