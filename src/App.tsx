import "./App.css";
import "remixicon/fonts/remixicon.css";

// contexts
import ThemeContext from "./contexts/ThemeContext";

// components
import TicketContent from "./components/TicketContent";
import PendingTickets from "./components/PendingTickets";

function App() {
  return (
    <div className="App">
      <ThemeContext>
        <div className="flex w-screen min-h-screen bg-gradient-to-b from-sky-500 to-indigo-500 p-6">
          <PendingTickets />
          <TicketContent />
        </div>
      </ThemeContext>
    </div>
  );
}

export default App;
