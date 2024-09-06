const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');


require('electron-reloader')(module)

const pages_path = 'views/pages/'
const createWindow = () => {
    const win = new BrowserWindow({
      width: 393,
      height: 852,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,}
    })
    win.loadURL('http://localhost:4000'); //Crea la direccion para la base de datos

    win.removeMenu(); // Esta línea elimina la barra de menú
  
    win.loadFile(pages_path + 'login.html')
  }
  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
// Escuchar el evento de intento de login
ipcMain.on('login-attempt', (event, { email, password }) => {
  if (email === 'email' && password === 'pass') {
    win.loadFile(pages_path + 'home.html') // Carga la nueva página
  } else {
      event.reply('login-failed', 'Invalid username or password');
  }
});




  