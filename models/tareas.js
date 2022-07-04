import { Tarea } from "./tarea.js";

import Color from "colors";

class Tareas {
  _listado = {};

  get listArr() {
    const list = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      list.push(tarea);
    });
    return list;
  }

  constructor() {
    this._listado = {};
  }

  loadTareas(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  createTarea(description = "") {
    const tarea = new Tarea(description);
    this._listado[tarea.id] = tarea;
  }

  deleteTarea (id) {
    if(this._listado[id]){
        delete this._listado[id];
    }
  }

  completeListArr() {
    console.log();
    this.listArr.forEach((tarea, id) => {
      const idx = `${id + 1}`.green;
      const { description, completedOn } = tarea;
      const state = completedOn ? "Completada".green : "Pendiente".red;
      console.log(`${idx}. ${description} :: ${state}`);
    });
  }

  listTareasCompletePending(complete = true) {
    console.log();
    let cont = 0;
    this.listArr.forEach((tarea) => {
      const { description, completedOn } = tarea;
      const state = completedOn ? "Completada".green : "Pendiente".red;
      if (complete) {
        if (completedOn) {
          cont += 1;
          console.log(
            `${(cont + '.').green} ${description} :: ${completedOn.green}`
          );
        }
      } else {
        if (!completedOn) {
          cont += 1;
          console.log(
            `${(cont + '.').green} ${description} :: ${state}`
          );
        }
      }
    });
  }

  toogleCompleted (ids = []){
    ids.forEach(id => {
      const tarea = this._listado[id];
      if(!tarea.completedOn){
        tarea.completedOn = new Date().toISOString();
      }
    });

    this.listArr.forEach(tarea => {
      if(!ids.includes(tarea.id)){
        this._listado[tarea.id].completedOn = null;
      }
    })
  }
}

export { Tareas };
