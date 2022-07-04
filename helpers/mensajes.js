const { resolve } = require("path");

require("colors");

const showMenu = () => {
  return new Promise((resolve) => {
    console.clear();

    console.log("============================".green);
    console.log("   Selecciona una opción".green);
    console.log("============================".green);

    console.log(`${`1.`.green} Crear Tarea`);
    console.log(`${`2.`.green} Listar Tareas`);
    console.log(`${`3.`.green} Listar Tareas Completadas`);
    console.log(`${`4.`.green} Listar Tareas Pendientes`);
    console.log(`${`5.`.green} Completar tarea(s)`);
    console.log(`${`6.`.green} Borrar Tarea`);
    console.log(`${`0.`.green} Salir \n`);

    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Se ocupara para el output del readline, el envio de la información que se solicitara del usuario
    readLine.question("Seleccione una opción: ", (option) => {
      readLine.close();
      resolve(option);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Se ocupara para el output del readline, el envio de la información que se solicitara del usuario
    readLine.question(
      `\n Presione ${"Enter".green} para continuar \n`,
      (option) => {
        readLine.close();
        resolve();
      }
    );
  });
};

module.exports = { showMenu, pause };
