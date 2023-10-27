import { Request, Response } from "npm:express@4.18.2";
import { razaValida } from "../functions.ts";
import CharacterModel from "../db/character.ts";

const updateCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, raza, descripción, habilidades } = req.body;
    if (!nombre || !raza || !descripción || !habilidades) {
      res.status(500).send("Faltan datos. Revisar si falta alguno entre: nombre, raza, descripción o habilidades");
      return;
    }

    if(!razaValida(raza)){
      res.status(500).send("Esa raza no es váida. Elegir entre: Hobbit, Humano, Elfo, Enano o Ent");
    }

    const updatedChar = await CharacterModel.findOneAndUpdate(
      { id },
      { nombre: nombre, raza: raza, descripción: descripción, habilidades: habilidades },
      { new: true }
    ).exec();

    if (!updatedChar) {
      res.status(404).send("Personaje no encontrado");
      return;
    }

    res.status(200).send({
      id: updatedChar._id.toString(),
      nombre: updatedChar.nombre,
      raza: updatedChar.raza,
      descripción: updatedChar.descripción,
      habilidades: updatedChar.habilidades,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateCharacter;