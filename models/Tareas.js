const Tarea = require("./Tarea");

class Tareas{

    constructor(){
        this.listado= {}
    }

    get listadoArr(){
        let listadoarreglo= []
        Object.keys(this.listado).forEach(key => listadoarreglo.push(this.listado[key]))
        return listadoarreglo;
    }

    cargarTareas(tareas = []){
        tareas.forEach(tarea => {
            this.listado[tarea.id]=tarea
        })
    }

    listarTareas(){
        
        let listatareas = '\n'
        this.listadoArr.forEach((tarea, index) => {
            listatareas+= `${((index+1).toString()+'.').green} Tarea: ${tarea.descripcion} ::  Estado: ${tarea.completadaEn ? 'Completada'.green : 'Pendiente'.red } \n`
        })
        console.log(listatareas)
    }

    BorrarTareas( id = ' ') {
        if(this.listado[id]){
            delete this.listado[id]
        }

    }

    mostrarTareasCompletadas(completada=true){

        let tareasactuales=[]
        if(completada){
            tareasactuales = this.listadoArr.filter(tarea => tarea.completadaEn !== null ? tarea : null)
        } else {
            tareasactuales = this.listadoArr.filter(tarea => tarea.completadaEn === null ? tarea : null)
        }

        tareasactuales.forEach((tarea, index) => {
        const indx = `${index+1}`.green
        const descripcion = `${tarea.descripcion}`
        console.log(`${indx} ${descripcion} :: estado: ${tarea.completadaEn ? `${tarea.completadaEn}`.green : 'Pendiente'.red}`)
        })
    }

    crearTareas(descripcion=''){
        const tarea = new Tarea(descripcion)
        this.listado[tarea.id]= tarea
    }


    toggleCompletadas( ids = []){
        ids.forEach(id => {
            const tarea = this.listado[id];
            if (!tarea.completadaEn){
                tarea.completadaEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)){
                this.listado[tarea.id].completadaEn =null;
            }
        })
    }
}

module.exports = Tareas;