const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

const pokemonName = "growlithe"; // Example Pokemon name
// Endpoint 1: A basic health check to see if the server is alive
app.get("/", (req, res) => {
  res.send("Pokemon API Server is running beautifully!");
});

app.get("/api/pokemon", async (req, res) => {
  try {
    // Fetching data from the public PokeAPI
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from PokeAPI");
    }

    console.log("Successfully fetched Pokemon data from PokeAPI");
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

    console.log(pokemonName, "data:", pokemonData);
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    res
      .status(500)
      .json({ error: "Something went wrong fetching backend data." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Backend server listening live at http://localhost:${PORT}`);
});
