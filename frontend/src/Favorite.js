import React from "react";
import "./Favorite.css";

const FavoriteBooks = () => {
  const currentUser = localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem("userData")) || {};

  const favoriteBooks = userData[currentUser].favorites;

  return (
    <div className="favorite-books-section">
      <h2>Favorite Books</h2>
      <div className="books-grid">
        {favoriteBooks.length > 0 ? (
          favoriteBooks.map((book, index) => (
            <div key={index} className="book-card">
              <img
                src={book.cover}
                alt={book.title}
                className="book-cover-favorite"
              />
              <div className="book-info">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No favorite books added yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteBooks;
