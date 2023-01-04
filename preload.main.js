const { ipcRenderer, dialog } = require('electron')
const fs = require('fs')
const path = require('path')
const { getFromId, removeObj } = require('./managedb')


window.addEventListener('load', () => {
    window.data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'save.json'), 'utf8'))
    window.filter = window.data.sort((a, b) => {
        console.log(a.id, b.id)
        if (a.id > b.id) return 1
        if (a.id < b.id) return -1
        return 0
    })

    window.refreshData = () => {
        window.data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'save.json'), 'utf8')); window.filter = window.data.sort((a, b) => {
            console.log(a.id, b.id)
            if (a.id > b.id) return 1
            if (a.id < b.id) return -1
            return 0
        });
        window.forceUpdate = Math.random() * 999 * 2000
    }
    window.edit = (id) => { ipcRenderer.send('edit', id) }
    window.new = (id) => { ipcRenderer.send('edit', id) }
    window.remove = (id) => {
        const result = window.genDialog({ message: "Tem certeza?", buttons: ["Sim", "Não"],closable:false })

        console.log(result)
        if (result == 0) {
            removeObj(id); window.refreshData()
        }
    }
    window.genDialog = (option) => {
        let optionsStr = JSON.stringify(option)
        return ipcRenderer.sendSync('option-dialog', optionsStr)
    }
})

//ipcRenderer.send('edit',1)



