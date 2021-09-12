const inquirer = require('inquirer');
const { validate } = require('uuid');
require('colors');

const preguntas = [
    {
        type:'list',
        name: 'opcion',
        message: '¿Qué vas a hacer hoy?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tareas`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log("\n============================".green)
    console.log("   Seleccione una opción".white)
    console.log("============================\n".green)

    const {opcion} = await inquirer.prompt(preguntas)
    return opcion;
}


const pausa = async () => {
    await inquirer.prompt([
        {
            type: 'input',
            name: 'respuesta',
            message: `Oprime la tecla ${'ENTER'.green} para continuar`
        }        
    ])
    
}

const mostrarListadoCheckList = async ( tareas= [] ) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i+1}.`.green
        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
            checked: (tarea.completadaEn) ? true : false
        }
    })

    const pregunta = [{
        type:'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices
    }]


    const { ids } = await inquirer.prompt(pregunta)
    return ids
}


const listadoTareasBorrar = async ( tareas = []) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i+1}.`.green
        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`
        }
    })

    choices.unshift({
        value:'0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [{
        type:'list',
        name: 'id',
        message: 'Borrar',
        choices
    }]


    const { id } = await inquirer.prompt(preguntas)
    return id
}

const confirmar = async (mensaje) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message: mensaje
    }]

    const {ok} = await inquirer.prompt(question);
    return ok
}

const leerDescripcion = async () => {
    const question = [
        {
            type: 'input',
            name: 'descripcion',
            message: 'Descripcion tarea: ',
            validate(value){
                if( value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }
    ]

    const {descripcion} = await inquirer.prompt(question)
    return descripcion
}

module.exports = {
    inquirerMenu,
    pausa,
    leerDescripcion,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}
