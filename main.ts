import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getCharacter from "./resolvers/getCharacter.ts";
import getCharacters from "./resolvers/getCharacters.ts";
import addCharacter from "./resolvers/addCharacter.ts";
import updateCharacter from "./resolvers/updateCharacter.ts";
import deletePerson from "./resolvers/deleteCharacter.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No hay url en el .env");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

const app = express();
app.use(express.json());
app
  .get("/api/tierramedia/personajes/:id", getCharacter)
  .get("/api/tierramedia/personajes", getCharacters)
  .post("/api/tierramedia/personajes", addCharacter)
  .put("/api/tierramedia/personajes/:id", updateCharacter)
  .delete("/api/tierramedia/personajes/:id", deletePerson);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});