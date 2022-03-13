import { useContext } from "react"
import { ModeThemeContext } from "../../contexts/ThemeContext"

function ButtonSection() {
  const mode = useContext(ModeThemeContext)

  return (
    <div>
      <button>Go</button>
      <button>Pause</button>
      <button>Reset</button>
    </div>
  )
}

export default ButtonSection
