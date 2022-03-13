import React, { useEffect, useState } from "react"
import { ReactNode } from "react"

const defaultTheme = "dark"
export const ModeThemeContext = React.createContext<"dark" | "light">(
  defaultTheme
)

function ThemeContext({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"dark" | "light">("dark")

  useEffect(() => {
    window.darkMode.getSystem((_event, value) => {
      setMode(value)
    })
  }, [])

  return (
    <ModeThemeContext.Provider value={mode}>
      {children}
    </ModeThemeContext.Provider>
  )
}

export default ThemeContext
