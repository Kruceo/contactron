const { ipcRenderer } = require('electron')
const fs = require('fs')
const path = require('path')
const { addObj, editObj } = require('./managedb')







ipcRenderer.send('load', 'save.json')


window.addEventListener('load', (win) => {
    window.data = fs.readFileSync(path.join(__dirname, 'data', 'save.json'), 'utf8')
    document.querySelector('#save').addEventListener('click', () => {
        addObj()
        window.close()
    })
    document.querySelector('#edit').addEventListener('click', () => {
        console.log(window.person)
        editObj(window.person.id)
        window.close()
    })
})


//window['main'].webContents.executeJavaScript('window.data = ' + fs.readFileSync(path.join(__dirname,'data','save.json'),'utf8'))






