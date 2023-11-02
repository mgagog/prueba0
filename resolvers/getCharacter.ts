import type { Request, Response } from "npm:express@4.18.2";
import { CharacterModel } from "../db/character.ts";

const getCharacter = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { id } = req.params;
        const char = await CharacterModel.findOne({ id }).exec();
        if (!char) {
          res.status(404).send("Personaje no encontrado");
          return;
        }
        res.status(200).send({
            id: char._id.toString(),
            nombre: char.nombre,
            raza: char.raza,
            descripción: char.descripción,
            habilidades: char.habilidades

        });
      } catch (error) {
        res.status(400).send(error.message);
        return;
      }
    
};

export default getCharacter;