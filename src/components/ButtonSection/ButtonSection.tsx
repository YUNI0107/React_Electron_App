import classNames from "classnames"

function ButtonSection({
  startCount,
  pauseCount,
  resetCount,
  isPauseMode,
}: {
  startCount: () => void
  pauseCount: () => void
  resetCount: () => void
  isPauseMode: boolean
}) {
  return (
    <div>
      <button className="btn" onClick={startCount}>
        Go
      </button>
      <button className="btn m-5" onClick={pauseCount}>
        Pause
      </button>
      <button
        className={classNames("btn", { "btn-disable": !isPauseMode })}
        onClick={resetCount}
      >
        Reset
      </button>
    </div>
  )
}

export default ButtonSection
