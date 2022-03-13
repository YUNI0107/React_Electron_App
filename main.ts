const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron")
const path = require("path")
const isDev = require("electron-is-dev")

let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.ts"),
    },
  })

  if (isDev) {
    // 開發階段直接與 React 連線
    mainWindow.loadURL("http://localhost:3000/")
  } else {
    // 產品階段直接讀取 React 打包好的
    mainWindow.loadFile("./build/index.html")
  }

  ipcMain.handle("dark-mode:toggle", () => {
    const newMode = nativeTheme.shouldUseDarkColors ? "light" : "dark"
    nativeTheme.themeSource = newMode
    mainWindow.webContents.send("dark-mode:getSystem", newMode)
  })

  ipcMain.handle("dark-mode:system", () => {
    nativeTheme.themeSource = "system"

    mainWindow.webContents.send(
      "dark-mode:getSystem",
      nativeTheme.shouldUseDarkColors ? "dark" : "light"
    )
  })
}

app.whenReady().then(() => {
  createWindow()

  // mainWindow.webContents.on("did-finish-load", function () {
  //   mainWindow.webContents.send(
  //     "dark-mode:getSystem",
  //     nativeTheme.shouldUseDarkColors ? "dark" : "day"
  //   )
  // })

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit()
})
