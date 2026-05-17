const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Pokemon API Server is running beautifully!");
});

app.get("/api/pokemon/:name", async (req, res) => {
  try {
    // 🔥 FIX: Added this line to extract the search term directly out of the URL path parameter!
    const pokemonName = req.params.name.toLowerCase().trim();

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
    );

    if (!response.ok) {
      return res.status(404).json({ error: "Pokémon not found in PokéAPI" });
    }

    console.log(`Successfully fetched ${pokemonName} data from PokeAPI`);
    const data = await response.json();

    const pokemonData = {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: data.types.map((typeInfo) => typeInfo.type.name),
      sprite: data.sprites.front_default,
    };

    res.json(pokemonData);
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    res
      .status(500)
      .json({ error: "Something went wrong fetching backend data." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server listening live at http://localhost:${PORT}`);
});
