import { useContext, useMemo, useState, useRef, useEffect } from "react"
import classNames from "classnames"

// contexts
import { ModeThemeContext } from "../../contexts/ThemeContext"

// components
import ButtonSection from "../ButtonSection"
import TimeBlock from "../TimeBlock"

// images
import RocketImage from "../../assets/rocket.gif"

function CounterSection() {
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [isPauseMode, setIsPauseMode] = useState(true)
  const timer = useRef<number | null>(null)
  const callback = useRef<() => void>(null!)
  const mode = useContext(ModeThemeContext)

  // time convert
  const sec = useMemo(() => {
    return totalSeconds % 60
  }, [totalSeconds])

  const min = useMemo(() => {
    return Math.floor((totalSeconds % (60 * 60)) / 60)
  }, [totalSeconds])

  const hour = useMemo(() => {
    return Math.floor(totalSeconds / (60 * 60))
  }, [totalSeconds])

  // operations
  const setNewTime = (
    type: "hour" | "min" | "sec",
    direction: "up" | "down"
  ) => {
    let timeNumber: number
    switch (type) {
      case "hour":
        timeNumber = 60 * 60
        break

      case "min":
        timeNumber = 60
        break
      case "sec":
        timeNumber = 1
        break
    }

    if (direction === "up") {
      if (totalSeconds + timeNumber > 60 * 60 * 60) return
      setTotalSeconds((previousValue) => previousValue + timeNumber)
    } else if (direction === "down") {
      if (totalSeconds - timeNumber < 0) return
      setTotalSeconds((previousValue) => previousValue - timeNumber)
    }
  }

  callback.current = () => {
    console.log("start", totalSeconds, isPauseMode, timer.current)
    if (totalSeconds <= 0 || (timer.current && isPauseMode)) return

    setIsPauseMode(false)
    setTotalSeconds((previousValue) => previousValue - 1)

    timer.current = window.setTimeout(function () {
      timer.current = null
      console.log(callback.current)
      callback.current()
    }, 1000)
  }

  const pauseCount = () => {
    clearTimer()
  }

  const resetCount = () => {
    if (isPauseMode) setTotalSeconds(0)
  }

  const clearTimer = () => {
    if (!timer.current) return

    clearTimeout(timer.current)
    timer.current = null
    setIsPauseMode(true)
  }

  //  effects
  useEffect(() => {
    if (totalSeconds <= 0) {
      // Times up
      clearTimer()
      if (!isPauseMode) {
        new Notification("Times Up", {
          body: "Times Up! Do you finish your work?",
        })
        window.clock.timeUpShowWindow()
      }
    }
  }, [totalSeconds, isPauseMode])

  useEffect(() => {
    window.clock.timeGo((_event) => {
      console.log("startCount")

      if (timer.current) return
      callback.current()
    })
  }, [])

  useEffect(() => {
    //  clear timer
    return () => {
      clearTimer()
    }
  }, [])

  if (!mode) return <div className="w-screen h-screen bg-cyan-200"></div>

  return (
    <div
      className={classNames("flex w-screen h-screen flex-col", {
        "bg-cyan-50": mode === "light",
        "bg-sky-900": mode === "dark",
      })}
    >
      <div className="flex-1 flex justify-center items-center flex-col">
        <div className="w-24 mb-6">
          <img className="w-full" src={RocketImage} alt="space-img" />
        </div>

        <div className="flex">
          <TimeBlock
            time={hour}
            type={"hour"}
            isPauseMode={isPauseMode}
            setNewTime={setNewTime}
          />
          <TimeBlock
            time={min}
            type={"min"}
            isPauseMode={isPauseMode}
            setNewTime={setNewTime}
          />
          <TimeBlock
            time={sec}
            type={"sec"}
            isPauseMode={isPauseMode}
            setNewTime={setNewTime}
          />
        </div>

        <ButtonSection
          startCount={callback.current}
          pauseCount={pauseCount}
          resetCount={resetCount}
          isPauseMode={isPauseMode}
        />
      </div>

      <div className="py-5">
        <button
          className={classNames({
            "text-sky-900": mode === "light",
            "text-cyan-50": mode === "dark",
          })}
          onClick={window.darkMode.toggle}
        >
          {mode === "dark" && <i className="ri-moon-fill"></i>}
          {mode === "light" && <i className="ri-sun-fill"></i>}
          <p>Mode</p>
        </button>
      </div>
    </div>
  )
}

export default CounterSection
