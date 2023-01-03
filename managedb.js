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

module.exports = {getFromId}