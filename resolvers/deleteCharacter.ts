import { Request, Response } from "npm:express@4.18.2";
import CharacterModel from "../db/character.ts";

const deleteCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const char = await CharacterModel.findOneAndDelete({ id }).exec();
    if (!char) {
      res.status(404).send("Personaje no encontrado");
      return;
    }
    res.status(200).send("Personaje eliminado");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteCharacter;