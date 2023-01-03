const { ipcRenderer } = require('electron')
const fs = require('fs')
const path = require('path')
const { getFromId } = require('./managedb')


window.addEventListener('load', () => {
    window.data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'save.json'), 'utf8'))
    window.filter = window.data.sort((a,b)=>
    {
        console.log(a.id,b.id)
        if(a.id > b.id)return 1
        if(a.id < b.id)return -1
        return 0
    })

    window.refreshData = ()=>{window.data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'save.json'), 'utf8'));window.filter = window.data.sort((a,b)=>
    {
        console.log(a.id,b.id)
        if(a.id > b.id)return 1
        if(a.id < b.id)return -1
        return 0
    });window.forceUpdate = Math.random() * 2222}
    window.edit = (id)=>{ipcRenderer.send('edit',id)}
    window.new = (id)=>{ipcRenderer.send('edit',id)}
})

//ipcRenderer.send('edit',1)



