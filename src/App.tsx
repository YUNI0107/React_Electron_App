import "./App.css"
import "remixicon/fonts/remixicon.css"

// contexts
import ThemeContext from "./contexts/ThemeContext"
import CounterSection from "./components/CounterSection/CounterSection"

function App() {
  return (
    <div className="App">
      <ThemeContext>
        <CounterSection />
      </ThemeContext>
    </div>
  )
}

export default App
