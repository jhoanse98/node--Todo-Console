
const {v4: uuidv4} = require('uuid');

class Tarea{
    constructor(descripcion){
        this.descripcion=descripcion,
        this.completadaEn= null,
        this.id = uuidv4() 
    }
}

module.exports = Tarea