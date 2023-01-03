const fs = require('fs')
const path = require('path')
function getFromId(id)
{
    let currentList = JSON.parse(fs.readFileSync(path.join(__dirname,'data','save.json'),'utf-8'))
    let select = currentList.filter(el=>
        {
            if(el.id == id)return el
        })

    return select[0]
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

function getBuff() {
    let value = parseInt(fs.readFileSync(path.join(__dirname, 'data', 'buff')))
    return value
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

function removeObj(id)
{
    let currentList = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'save.json'), 'utf-8'))
    let newList = currentList.filter((el) => {
        if (el.id != id) return el
    })
    fs.writeFileSync('data/save.json', JSON.stringify(newList, ' ', 2))
}

module.exports = {getFromId,addObj,getBuff,editObj,getObj,addToBuff,removeObj}