import { Request, Response } from "npm:express@4.18.2";
import { razaValida } from "../functions.ts";
import { CharacterModel } from "../db/character.ts"

const addCharacter = async (req: Request, res: Response) => {
  try {
    const { nombre, raza, descripción, habilidades } = req.body;
    if (!nombre || !raza || !descripción || !habilidades) {
      res.status(500).send("Faltan datos. Revisar si falta alguno entre: nombre, raza, descripción o habilidades");
      return;
    }

    if(!razaValida(raza)){
      res.status(500).send("Esa raza no es váida. Elegir entre: Hobbit, Humano, Elfo, Enano o Ent");
    }

    //if(!Object.values(RAZAS).includes(raza)); Si se hace con enum

    /*
    if(
      typeof nombre !== string || typeof raza !== "string" ...
    )
    */

    //FindOne por si hay dni

    const newChar = await CharacterModel.create({ nombre: nombre, raza: raza, descripción: descripción, habilidades: habilidades });
    await newChar.save();

    res.status(200).send({
      id: newChar._id.toString(),
      nombre: newChar.nombre,
      raza: newChar.raza,
      descripción: newChar.descripción,
      habilidades: newChar.habilidades,
    });
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }
};

export default addCharacter;