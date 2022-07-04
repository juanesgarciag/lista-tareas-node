import inquirer from "inquirer";

import colors from "colors";

const menuQuestions = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que deseas hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear Tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar Tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar Tareas Completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar Tareas Pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar Tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inputPause = [
  {
    type: "input",
    name: "inputPause",
    message: `\n Presione ${"Enter".green} para continuar \n`,
  },
];

const inquirerMenu = async () => {
  console.clear();

  console.log("============================".green);
  console.log("   Selecciona una opción".white);
  console.log("============================".green);

  const { opcion } = await inquirer.prompt(menuQuestions);

  return opcion;
};

const pause = async () => {
  console.log("\n");
  const inpPause = await inquirer.prompt(inputPause);

  return inpPause;
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "description",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { description } = await inquirer.prompt(question);

  return description;
};

const deleteListTareas = async (tareas = []) => {

  const choices = tareas.map((tarea, id) => {

    const idx = `${id + 1}`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.description}`
    }
  })

  choices.unshift({
    value: '0',
    name: '0.'.green + 'Cancelar'
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ]

  const { id } = await inquirer.prompt(questions);

  return id;
};

const confirm = async (message) =>{
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    }
  ]

  const { ok } = await inquirer.prompt(question);

  return ok;
}

const showCheckList = async (tareas = []) => {

  const choices = tareas.map((tarea, id) => {

    const idx = `${id + 1}`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.description}`,
      checked: (tarea.completedOn) ? true : false
    }
  })

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices
    }
  ]

  const { ids } = await inquirer.prompt(question);

  return ids;
};

export { inquirerMenu, pause, readInput, deleteListTareas, confirm, showCheckList };
