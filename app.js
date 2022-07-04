import { deleteListTareas, inquirerMenu, pause, readInput, confirm, showCheckList } from "./helpers/inquire.js";
import { Tareas } from "./models/tareas.js";

import colors from "colors";
import { readDB, saveDB } from "./helpers/saveFile.js";

// console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = readDB();

  // Cargar tareas
  if(tareasDB){
    tareas.loadTareas(tareasDB);
  }

  do {
    // Imprime el menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await readInput("Descripción: ");
        tareas.createTarea(desc);
        break;

      case "2":
        tareas.completeListArr();
        break;

      case "3":
        tareas.listTareasCompletePending(true);
        break;

      case "4":
        tareas.listTareasCompletePending(false);
        break;

        case "5":
        const ids = await showCheckList(tareas.listArr);
        tareas.toogleCompleted(ids);
        break;

      case "6":
        const id = await deleteListTareas(tareas.listArr);
        if(id !== '0'){
          const ifconfirm = await confirm('¿Esta seguro de eliminar la tarea?');
          if(ifconfirm){
            tareas.deleteTarea(id);
            console.log('\nTarea borrada exitosamente.'.bgGreen)
          }
        }
        break;

      default:
        break;
    }

    saveDB(tareas.listArr);

    await pause();

    // if (opt !== "0") await pause();
  } while (opt != 0);
};

main();
