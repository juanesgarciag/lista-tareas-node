import fs from 'fs';

const file = './db/data.json'

//Salva la info ingresada por el usuario en un archivo JSON
const saveDB = (data) =>{

    fs.writeFileSync(file, JSON.stringify(data));
}

//Leer DB creada en JSON
const readDB = () => {
    //existsSync valida si existe un archivo en el path
    if(!fs.existsSync(file)){
        return null;
    }

    //readFileSync lee el archivo en el path y encoding decodifica en una salida valida
    const info = fs.readFileSync(file, { encoding: 'utf-8' });
    //JSON.parse convierte en un objeto string el JSON
    const data = JSON.parse(info);

    return data;
}

export {saveDB, readDB};