import { useContext } from "react"
import classNames from "classnames"

// contexts
import { ModeThemeContext } from "../../contexts/ThemeContext"

function TimeBlock({
  time,
  isPauseMode,
  type,
  setNewTime,
}: {
  time: number
  isPauseMode: boolean
  type: "hour" | "min" | "sec"
  setNewTime: (type: "hour" | "min" | "sec", direction: "up" | "down") => void
}) {
  const mode = useContext(ModeThemeContext)

  return (
    <div
      className={classNames("py-6 px-4 mx-4 min-w-[80px]", {
        "bg-sky-900": mode === "light",
        "bg-cyan-50": mode === "dark",
      })}
    >
      <button
        className={classNames({
          invisible: !isPauseMode,
          "text-cyan-50": mode === "light",
          "text-sky-900": mode === "dark",
        })}
        onClick={() => setNewTime(type, "up")}
      >
        <i className="ri-arrow-up-s-fill"></i>
      </button>
      <h1
        className={classNames("text-3xl my-2 font-bold", {
          "text-cyan-50": mode === "light",
          "text-sky-900": mode === "dark",
        })}
      >
        {time}
      </h1>
      <button
        className={classNames({
          invisible: !isPauseMode,
          "text-cyan-50": mode === "light",
          "text-sky-900": mode === "dark",
        })}
        onClick={() => setNewTime(type, "down")}
      >
        <i className="ri-arrow-down-s-fill"></i>
      </button>
    </div>
  )
}

export default TimeBlock
