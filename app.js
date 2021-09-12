const {guardarArchivo, leerArchivo} = require('./helpers/guardarArchivo');
const {inquirerMenu, pausa, leerDescripcion, listadoTareasBorrar, confirmar, mostrarListadoCheckList} = require('./helpers/inquirer');
const { mensajes} = require('./helpers/mensajes');
const Tarea = require('./models/Tarea');
const Tareas = require('./models/Tareas');

require('colors')

const  main = async () => {
    
    let opt = ''
    const tareas = new Tareas()

    const tareasdata = leerArchivo()

    if(tareasdata){
        tareas.cargarTareas(tareasdata)
    }

    
    


    while( opt !== '0'){
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const descripcion = await leerDescripcion()
                tareas.crearTareas(descripcion)
                break;
            case '2':
                tareas.listarTareas();
                break;
            case '3':
                tareas.mostrarTareasCompletadas(true);
                break;
            case '4':
                tareas.mostrarTareasCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
                console.log(ids)
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if( id !== '0'){
                    const ok = await confirmar('¿Está seguro que desea borrar?')
                    if(ok){
                        tareas.BorrarTareas(id)
                    }
                }
                break;
        }
        
        guardarArchivo(tareas.listadoArr)

        if( opt !== '0') await pausa()
    }
}

main();