const fs = require('fs')
const path = require('path')

let data = JSON.parse(fs.readFileSync(path.join(__dirname,'../data','save.json'),'utf-8'))

fs.writeFileSync(path.join(__dirname,'../data','backup.json'),''+JSON.stringify(data))

data.forEach((element,index) => {
    element.id = index
    
});
fs.writeFileSync(path.join(__dirname,'../data','save.json'),''+JSON.stringify(data))
fs.writeFileSync(path.join(__dirname,'../data','buff'),''+data.length)


