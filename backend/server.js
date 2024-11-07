const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());

// Osnovna ruta koja odgovara na GET zahtjeve
app.get("/", (req, res) => {
  res.send("Hello from the backend server!");
});
// Endpoint za pretragu knjiga
app.get("/api/booksearch", async (req, res) => {
  const { query } = req.query;
  if (!query)
    return res.status(400).json({ message: "Missing query parameter." });

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching books:", error);
    res
      .status(500)
      .json({ message: "Došlo je do pogreške prilikom pretrage knjiga." });
  }
});

// Endpoint za preporučene knjige
app.get("/api/recommendedbooks", async (req, res) => {
  const { author } = req.query;
  if (!author)
    return res.status(400).json({ message: "Missing author parameter." });

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&key=${process.env.GOOGLE_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching recommended books:", error);
    res.status(500).json({
      message: "Došlo je do pogreške prilikom preuzimanja preporučenih knjiga.",
    });
  }
});

// Endpoint za pretragu filmova
app.get("/api/moviesearch", async (req, res) => {
  const { query } = req.query;
  if (!query)
    return res.status(400).json({ message: "Missing query parameter." });

  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Error fetching movies." });
  }
});

// Endpoint za preporučene filmove
app.get("/api/recommendedmovies", async (req, res) => {
  const { genre } = req.query;
  if (!genre)
    return res.status(400).json({ message: "Missing genre parameter." });

  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${genre}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    res.status(500).json({
      message: "Error fetching recommended movies.",
    });
  }
});

// Endpoint za dohvaćanje detalja o filmu
app.get("/api/moviedetails", async (req, res) => {
  const { movieId } = req.query;
  if (!movieId)
    return res.status(400).json({ message: "Missing movieId parameter." });

  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${movieId}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    res.status(500).json({ message: "Error fetching movie details." });
  }
});

// Endpoint za pretragu igara
app.get("/api/gamesearch", async (req, res) => {
  const { query } = req.query;
  if (!query)
    return res.status(400).json({ message: "Missing query parameter." });

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page_size=5&search=${query}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: "Error fetching games." });
  }
});

// Endpoint za preporučene igre
app.get("/api/recommendedgames", async (req, res) => {
  const { genreId } = req.query;
  if (!genreId)
    return res.status(400).json({ message: "Missing genreId parameter." });

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?genres=${genreId}&key=${process.env.RAWG_API_KEY}&rating=4`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching recommended games:", error);
    res.status(500).json({ message: "Error fetching recommended games." });
  }
});

// Endpoint za dohvaćanje detalja o igri
app.get("/api/gamedetails", async (req, res) => {
  const { gameId } = req.query;
  if (!gameId)
    return res.status(400).json({ message: "Missing gameId parameter." });

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${gameId}?key=${process.env.RAWG_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching game details:", error);
    res.status(500).json({ message: "Error fetching game details." });
  }
});

// Pokretanje servera
app.listen(port, () => {
  console.log(`Server je pokrenut na portu ${port}`);
});
