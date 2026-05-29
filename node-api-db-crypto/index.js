const express = require("express");
const cors = require("cors"); // 1. Import CORS
const app = express();
const PORT = 3000;

app.use(cors()); // 2. Enable CORS for all incoming requests
// Middleware to parse JSON data
app.use(express.json());

// Endpoint 1: A basic health check to see if the server is alive
app.get("/", (req, res) => {
  res.send("Crypto API Server is running beautifully!");
});

// Endpoint 2: Fetches live top crypto data
app.get("/api/crypto", async (req, res) => {
  try {
    // Fetching real-time market data from public CoinGecko API
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from CoinGecko");
    }

    const data = await response.json();

    // Map the heavy data response down to just the clean pieces we care about
    const cleanData = data.map((coin) => ({
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: `$${coin.current_price.toLocaleString()}`,
      marketCap: `$${coin.market_cap.toLocaleString()}`,
      image: coin.image,
    }));

    // Send our polished data back to whoever called our API
    res.json(cleanData);
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    res
      .status(500)
      .json({ error: "Something went wrong fetching backend data." });
  }
});

// Pokemon api endpoint
app.get("/api/pokemon", async (req, res) => {
  try {
    // Fetching data from the public PokeAPI
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");

    if (!response.ok) {
      throw new Error("Failed to fetch data from PokeAPI");
    }

    console.log("Successfully fetched Pokemon data from PokeAPI");
    const data = await response.json();

    res.json(data);

    console.log("Response:", data);
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

/*
? This is a sample comment block to demonstrate how to use different comment styles in JavaScript.
*/
