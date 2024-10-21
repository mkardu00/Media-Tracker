import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Recommended.css";
import MediaDetails from "./MediaDetails";

const Recommended = ({ recommendedBooks }) => {
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleBookClick = (bookId) => {
    setSelectedBookId(bookId);
  };

  const handleCloseDetails = () => {
    setSelectedBookId(null);
  };
  return (
    <div>
      <h2>Recommended Books</h2>
      <div className="card-container">
        {recommendedBooks.map(
          (book, index) =>
            book.volumeInfo.imageLinks && (
              <Card
                key={index}
                image={
                  book.volumeInfo.imageLinks &&
                  book.volumeInfo.imageLinks.smallThumbnail
                }
                title={book.volumeInfo.title}
                author={book.volumeInfo.authors?.join(", ")}
                onDetailsClick={() => {
                  handleBookClick(book.id);
                }}
              />
            )
        )}
      </div>
      {selectedBookId && (
        <MediaDetails
          mediaId={selectedBookId}
          mediaType="book"
          onClose={handleCloseDetails}
        />
      )}
    </div>

    /*     <div className="recommended-books">
      <h2>Recommended Books</h2>

      {recommendedBooks.map((book, index) => (
        <div className="book-recommendations" key={index}>
          <div className="book-card">
            <img
              src={
                book.volumeInfo.imageLinks &&
                book.volumeInfo.imageLinks.smallThumbnail
              }
              alt="Book Cover"
              className="book-cover"
            />
            <div className="book-details">
              <h3 className="book-title">{book.volumeInfo.title}</h3>
              <p className="book-author">
                {book.volumeInfo.authors?.join(", ")}
              </p>
              <p className="book-description">
                Short description of the book goes here. It should be concise
                and informative.
              </p>
              <div className="book-actions">
                <button className="details-button">Details</button>
                <button onClick={() => handleAddBookFromSearch(book)}>
                  Add to {activeTab}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div> */
  );
};

export default Recommended;
