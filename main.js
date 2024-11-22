require('dotenv').config()
require('electron-reloader')(module)

const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const serverApp = require('express')()

let win

const startApp = async () => {
  const initServer = require(path.join(__dirname, 'src/server'))
  const server = await initServer(serverApp)
  const createWindow = () => {
    win = new BrowserWindow({
      width: 393,
      height: 852,
      // resizable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    })

    win.loadFile(path.join(app.getAppPath(), 'src/views/login.html'))
    // win.removeMenu()
  }

  ipcMain.on('show-dialog', (event, message) => {
    dialog.showMessageBox(win, {
      type: 'info',
      title: 'Custom Dialog',
      message,
      buttons: ['OK']
    })
  })

  ipcMain.on('go-to', (event, message) => {
    win.loadFile(path.join(app.getAppPath(), 'src/views', message))
  })

  app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
      server.close()
    }
  })
}

startApp()
