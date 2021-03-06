import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { IpcRendererEvent } from "electron"

export interface IDarkMode {
  toggle: () => Promise<void>
  system: () => Promise<void>
  getSystem: (
    callback: (_event: IpcRendererEvent, value: "light" | "dark") => void
  ) => Promise<void>
}

export interface IClock {
  timeUpShowWindow: () => void
  timeGo: (callback: (_event: IpcRendererEvent) => void) => void
  timePause: (callback: (_event: IpcRendererEvent) => void) => void
  getPauseMode: (isPauseMode: boolean) => void
}

declare global {
  interface Window {
    darkMode: IDarkMode
    clock: IClock
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
