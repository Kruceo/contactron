const { ipcRenderer } = require('electron')
const fs = require('fs')
const path = require('path')

function getObj() {

    let finalObj = {}
    finalObj.numbers = []
    finalObj.info = []
    finalObj.name = document.querySelector('#name').value
    document.querySelectorAll('input[id="number"]').forEach((each) => {
        finalObj.numbers.push(each.value)
    })
    document.querySelectorAll('input[id="info"]').forEach((each) => {
        finalObj.info.push(each.value)
    })
    console.log(finalObj)
    return finalObj
}
if (!fs.existsSync(path.join(__dirname, 'data', 'buff'))) {
    fs.writeFileSync(path.join(__dirname, 'data', 'buff'), "9999")
}

function addToBuff(add) {
    let value = parseInt(fs.readFileSync(path.join(__dirname, 'data', 'buff')))
    fs.writeFileSync(path.join(__dirname, 'data', 'buff'), '' + (value + add))
}


function editObj(id) {
    let currentList = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'save.json'), 'utf-8'))
    console.log(currentList)
    let newObj = getObj()
    newObj.id = id
    let newList = currentList.filter((el) => {
        if (el.id != id) return el
    })
    newList.push(newObj)
    fs.writeFileSync('data/save.json', JSON.stringify(newList, ' ', 2))
}



function getBuff() {
    let value = parseInt(fs.readFileSync(path.join(__dirname, 'data', 'buff')))
    return value
}
function addObj() {
    let currentList = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'save.json'), 'utf-8'))

    console.warn(currentList)
    let newObj = getObj()
    addToBuff(1)
    newObj.id = getBuff()

    currentList.push(newObj)
    fs.writeFileSync('data/save.json', JSON.stringify(currentList, ' ', 2))
}
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






