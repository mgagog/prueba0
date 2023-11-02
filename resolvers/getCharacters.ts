import type { Request, Response } from "npm:express@4.18.2";
import { CharacterModel } from "../db/character.ts";

const getCharacters = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const chars = await CharacterModel.find({}).exec();
        res.status(200).send(chars.map((char) => {
          return {
            id: char._id.toString(),
            nombre: char.nombre,
            raza: char.raza,
            descripción: char.descripción,
            habilidades: char.habilidades
          }
        }));
      } catch (error) {
        res.status(400).send(error.message);
        return;
      }
    
};

export default getCharacters;