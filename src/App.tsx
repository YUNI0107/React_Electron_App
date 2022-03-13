import { useState } from "react"
import "./App.css"
import "remixicon/fonts/remixicon.css"

// contexts
import ThemeContext from "./contexts/ThemeContext"
import CounterSection from "./components/CounterSection/CounterSection"

function App() {
  const [totalSeconds, setTotalSeconds] = useState(0)

  return (
    <div className="App">
      <ThemeContext>
        <CounterSection totalSeconds={totalSeconds} />
      </ThemeContext>
    </div>
  )
}

export default App
