const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("darkMode", {
  toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
  system: () => ipcRenderer.invoke("dark-mode:system"),
  getSystem: (callback) => ipcRenderer.on("dark-mode:getSystem", callback),
})

contextBridge.exposeInMainWorld("clock", {
  timeUpShowWindow: () => ipcRenderer.invoke("clock:time-up"),
  timeGo: (callback) => ipcRenderer.on("clock:go", callback),
  timePause: (callback) => ipcRenderer.on("clock:pause", callback),
  getPauseMode: (isPauseMode) =>
    ipcRenderer.invoke("clock:get-pause-mode", isPauseMode),
})
