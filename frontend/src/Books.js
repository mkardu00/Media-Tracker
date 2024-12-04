import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BooksTabs.css";
import NavBar from "./NavBar";
import MediaDetails from "./MediaDetails";
import Recommended from "./Recommended";
import StarRating from "./StarRating";
import { FaEye, FaTrashAlt, FaCheckCircle, FaHeart } from "react-icons/fa";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const [currentBooks, setCurrentBooks] = useState([]);
  const [activeTab, setActiveTab] = useState("wantToRead");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetching token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Redirect to login if no token
    if (!token) {
      navigate("/");
      return;
    }

    // Fetch books for the authenticated user
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/books`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentBooks(response.data.books || []);
        setFavorites(response.data.favorites || []);
      } catch (err) {
        setError("Failed to fetch books. Please try again.");
      }
    };

    fetchBooks();
  }, [token, navigate]);

  const handleSearchBooks = async () => {
    if (searchQuery.trim() === "") return;

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/booksearch?query=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResults(response.data.items || []);
    } catch (err) {
      setError("Error searching for books. Please try again.");
    }
  };

  const handleAddBookFromSearch = async (book) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/books`,
        { book, status: activeTab },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCurrentBooks([...currentBooks, response.data.book]);
      setSearchResults([]);
    } catch (err) {
      setError("Error adding book. Please try again.");
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/books/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCurrentBooks(currentBooks.filter((book) => book.id !== bookId));
    } catch (err) {
      setError("Error deleting book. Please try again.");
    }
  };

  const handleFavoriteToggle = async (book) => {
    try {
      const updatedFavorites = favorites.includes(book.id)
        ? favorites.filter((id) => id !== book.id)
        : [...favorites, book.id];

      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/favorites`,
        { favorites: updatedFavorites },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFavorites(updatedFavorites);
    } catch (err) {
      setError("Error updating favorites. Please try again.");
    }
  };

  return (
    <div>
      <NavBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearchBooks}
      />

      {error && <div className="error">{error}</div>}

      <div className="tabs-container">
        <div className="tab-navigation">
          <button
            className={activeTab === "wantToRead" ? "active" : ""}
            onClick={() => setActiveTab("wantToRead")}
          >
            Want to Read
          </button>
          <button
            className={activeTab === "reading" ? "active" : ""}
            onClick={() => setActiveTab("reading")}
          >
            Reading
          </button>
          <button
            className={activeTab === "read" ? "active" : ""}
            onClick={() => setActiveTab("read")}
          >
            Read
          </button>
        </div>

        <div className="tab-content">
          <table className="books-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <button onClick={() => handleFavoriteToggle(book)}>
                      {favorites.includes(book.id) ? "Unfavorite" : "Favorite"}
                    </button>
                    <button onClick={() => handleDeleteBook(book.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Recommended
        recommendedMedia={recommendedBooks}
        handleAddMedia={handleAddBookFromSearch}
      />
    </div>
  );
};

export default Books;
