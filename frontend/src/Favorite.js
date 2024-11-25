import React, { useState } from "react";
import "./Favorite.css";

const Favorite = () => {
  const [selectedCategory, setSelectedCategory] = useState("books");
  const currentUser = localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem("userData")) || {};

  const favoriteBooks = userData[currentUser]?.favorites || [];
  const favoriteGames = userData[currentUser]?.favoriteGames || [];
  const favoriteMovies = userData[currentUser]?.movies?.favorites || [];

  const renderFavorites = () => {
    switch (selectedCategory) {
      case "books":
        return favoriteBooks.length > 0 ? (
          favoriteBooks.map((book, index) => (
            <div key={index} className="item-card">
              <img src={book.cover} alt={book.title} className="item-cover" />
              <div className="item-info">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No favorite books added yet.</p>
        );
      case "games":
        return favoriteGames.length > 0 ? (
          favoriteGames.map((game, index) => (
            <div key={index} className="item-card">
              <img src={game.cover} alt={game.title} className="item-cover" />
              <div className="item-info">
                <h3>{game.title}</h3>
                <p>{game.developer}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No favorite games added yet.</p>
        );
      case "movies":
        return favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie, index) => (
            <div key={index} className="item-card">
              <img src={movie.cover} alt={movie.title} className="item-cover" />
              <div className="item-info">
                <h3>{movie.title}</h3>
                <p>{movie.director}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No favorite movies added yet.</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="favorite-items-section">
      <h2>FAVORITE ITEMS</h2>

      <div className="tabs">
        <div
          className={`tab ${selectedCategory === "books" ? "active" : ""}`}
          onClick={() => setSelectedCategory("books")}
        >
          Books
        </div>
        <div
          className={`tab ${selectedCategory === "games" ? "active" : ""}`}
          onClick={() => setSelectedCategory("games")}
        >
          Video Games
        </div>
        <div
          className={`tab ${selectedCategory === "movies" ? "active" : ""}`}
          onClick={() => setSelectedCategory("movies")}
        >
          Movies
        </div>
      </div>

      <div className="items-grid">{renderFavorites()}</div>
    </div>
  );
};

export default Favorite;
