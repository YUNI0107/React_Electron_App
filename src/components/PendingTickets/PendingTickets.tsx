import { useContext, useEffect, useState } from "react";
import classNames from "classnames";

// contexts
import { ModeThemeContext } from "../../contexts/ThemeContext/ThemeContext";

function PendingTickets() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const mode = useContext(ModeThemeContext);
  console.log(mode);

  // operation
  const updateOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <div className="flex-[2] text-left">
      <h1 className="text-white text-xl font-bold">Pending Tickets</h1>
      <div className="text-white">
        <i
          className={classNames("ri-wifi-off-fill inline-block mr-2", {
            "opacity-30": isOnline,
          })}
        ></i>
        {isOnline ? (
          <p className="inline-block"> Services On.</p>
        ) : (
          <p className="inline-block"> Did not get internet connect.</p>
        )}
      </div>

      <div>
        <p>Mode</p>
        <button onClick={window.darkMode.toggle}>Toggle Mode</button>
      </div>
    </div>
  );
}

export default PendingTickets;
