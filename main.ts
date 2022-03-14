const {
  app,
  BrowserWindow,
  ipcMain,
  nativeTheme,
  Tray,
  Menu,
  nativeImage,
} = require("electron")
const path = require("path")
const isDev = require("electron-is-dev")

let mainWindow = null
let tray = null

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
}

app.whenReady().then(() => {
  createWindow()

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

  ipcMain.handle("clock:time-up", () => {
    mainWindow.show()
  })

  // create tray
  const icon = nativeImage.createFromPath("src/assets/icon.png")
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Go",
      type: "radio",
      checked: true,
      click: () => {
        mainWindow.webContents.send("clock:go")
      },
    },
    { label: "Pause", type: "radio", checked: true },
    {
      label: "Open Clock",
      type: "normal",
      click: () => mainWindow.show(),
    },
  ])

  tray.setToolTip("This is a count down clock.")
  tray.setContextMenu(contextMenu)

  // Dark mode detect when first init
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send(
      "dark-mode:getSystem",
      nativeTheme.shouldUseDarkColors ? "dark" : "light"
    )
  })

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()

      // After MacOs close window, need to detect Dark mode again
      mainWindow.webContents.on("did-finish-load", () => {
        mainWindow.webContents.send(
          "dark-mode:getSystem",
          nativeTheme.shouldUseDarkColors ? "dark" : "light"
        )
      })
    }
  })
})

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit()
})
