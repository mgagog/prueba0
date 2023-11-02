import mongoose from "npm:mongoose@7.6.3"
import { Character } from "../types.ts";

const Schema = mongoose.Schema;

const characterSchema = new Schema(
    {
      nombre: { type: String, required: true },
      raza: { type: String, required: true },
      descripcion: { type: String, required: true },
      habilidades: { type: String, required: true }
    },
    { timestamps: true }
  );
export type CharacterModelType = mongoose.Document & Omit<Character, "id">;

export const CharacterModel = mongoose.model<CharacterModelType>("Character", characterSchema);