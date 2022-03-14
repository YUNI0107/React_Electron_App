import React, { useEffect, useState } from "react"
import { ReactNode } from "react"

const defaultTheme = "dark"
export const ModeThemeContext = React.createContext<"dark" | "light" | null>(
  defaultTheme
)

function ThemeContext({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"dark" | "light" | null>("dark")

  useEffect(() => {
    window.darkMode.getSystem((_event, value) => {
      setMode(value)
      console.log("render", value)
    })
  }, [])

  return (
    <ModeThemeContext.Provider value={mode}>
      {children}
    </ModeThemeContext.Provider>
  )
}

export default ThemeContext
