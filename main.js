const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const axios = require('axios'); // Usamos Axios para hacer las solicitudes HTTP

require('electron-reloader')(module);

const pages_path = 'views/pages/';
let mainWindow; // Definimos la ventana globalmente

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 393,
    height: 852,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile(pages_path + 'login.html'); // Cargamos la página de login inicialmente
  mainWindow.removeMenu(); // Elimina la barra de menú
};

app.whenReady().then(() => {
  createWindow();
  mainWindow.webContents.openDevTools();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
ipcMain.on('login', (event, email, password) => {
    let data = new URLSearchParams();
    data.append('email', email)
    data.append('password', password)

    fetch('http://localhost:4000/login', {
      method:'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data.toString() 
    }).then(res => {
      if (res.ok){
      mainWindow.loadFile(pages_path +'home.html');

      }
      else {
        dialog.showErrorBox('error', 'No estas bien')
      }
    })
});

