const fs = require('fs')
const archivo = "./db/data.txt"

const guardarArchivo = data => {
    fs.writeFileSync(archivo, JSON.stringify(data))
}


const leerArchivo = () => {
    if(!fs.existsSync(archivo)){
        return null;
    }
    const file = fs.readFileSync(archivo, {encoding: 'utf-8'})
    const data = JSON.parse(file)
    return data;
}

module.exports = {
    guardarArchivo,
    leerArchivo
}