import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookDetails.css";

const BookDetails = ({ bookId, onClose }) => {
  const [bookDetails, setBookDetails] = useState(null);
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${API_KEY}`
        );
        setBookDetails(response.data.volumeInfo);
      } catch (error) {
        console.error("Greška pri dohvaćanju detalja o knjizi:", error);
      }
    };

    if (bookId) {
      fetchBookDetails();
    }
  }, [bookId, API_KEY]);

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-details-modal">
      <div className="book-details-content">
        <button onClick={onClose} className="close-button">
          X
        </button>
        <h2>{bookDetails.title}</h2>
        {bookDetails.authors && (
          <p className="book-details-p">
            <strong>Author:</strong> {bookDetails.authors.join(", ")}
          </p>
        )}
        {bookDetails.averageRating && (
          <p className="book-details-p">
            <strong>Rating:</strong> {bookDetails.averageRating} / 5
          </p>
        )}
        {bookDetails.description && (
          <p className="book-details-p">
            <strong>Description:</strong> {bookDetails.description}
          </p>
        )}
        {bookDetails.imageLinks && (
          <img src={bookDetails.imageLinks.thumbnail} alt={bookDetails.title} />
        )}
      </div>
    </div>
  );
};

export default BookDetails;
