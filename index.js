const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs");
const {getFromId} = require('./managedb.js')
const path = require('path')
let window = [];
app.whenReady().then(() => {

  window['main'] = new BrowserWindow(
    {
      
      width: 700,
      height: 600,
      minWidth:600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation:false,
        preload: path.join(__dirname, 'preload.main.js')
      }
    })
    
  window['main'].webContents.openDevTools()
  window['main'].setMenu(null)
  window['main'].loadFile('page/main/index.html')
  //window['main'].loadURL('http://localhost:5173/page/main/index.html')
  
  
})
ipcMain.on('option-dialog',(event,value)=>
{
  console.log(value)
  const dlg = dialog.showMessageBoxSync(JSON.parse(value))
  event.returnValue = dlg
  
})
ipcMain.on('edit', (event, value) => {
  window['edit'] = new BrowserWindow(
    {
  
      width: 600,
      height: 400,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: path.join(__dirname,'preload.edit.js')
      }
    })
  
  //window['edit'].webContents.openDevTools()
  window['edit'].loadFile('page/edit/edit.html')
  
  window['edit'].webContents.executeJavaScript('(()=>{let event = new Event("person");event.person = '+(value?(JSON.stringify(getFromId(value))):'null')+';window.dispatchEvent(event)})()')
})

