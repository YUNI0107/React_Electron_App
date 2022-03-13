import classNames from "classnames"
import { useContext } from "react"

// contexts
import { ModeThemeContext } from "../../contexts/ThemeContext"

// components
import ButtonSection from "../ButtonSection"

function CounterSection({ totalSeconds }: { totalSeconds: number }) {
  const mode = useContext(ModeThemeContext)

  return (
    <div
      className={classNames("flex w-screen h-screen flex-col", {
        "bg-blue-50": mode === "light",
        "bg-blue-900": mode === "dark",
      })}
    >
      <div className="flex-1 flex justify-center items-center">
        {totalSeconds}
        <ButtonSection />
      </div>

      <div>
        <button onClick={window.darkMode.toggle}>Toggle Mode</button>
      </div>
    </div>
  )
}

export default CounterSection
