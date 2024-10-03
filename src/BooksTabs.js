import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BooksTabs.css";
import BookDetails from "./BookDetails";

const BooksTabs = () => {
  const currentUser = localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem("userData")) || {};
  const userBooksObj = userData[currentUser]?.books || {
    wantToRead: [],
    reading: [],
    read: [],
  };

  const [activeTab, setActiveTab] = useState("wantToRead");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [currentBooks, setCurrentBooks] = useState(
    userBooksObj[activeTab] || []
  );

  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  useEffect(() => {
    setCurrentBooks(userBooksObj[activeTab] || []);
  }, [activeTab, userBooksObj]);

  const handleSearchBooks = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${API_KEY}`
        );
        setSearchResults(response.data.items || []);
      } catch (error) {
        console.error("Greška pri dohvaćanju knjiga:", error);
      }
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddBookFromSearch = (book) => {
    const bookToAdd = {
      title: book.volumeInfo.title,
      bookId: book.id,
    };
    userBooksObj[activeTab].push(bookToAdd);
    localStorage.setItem("userData", JSON.stringify(userData));
    alert(`Book "${book.volumeInfo.title}" added to your ${activeTab} list.`);
    setSearchQuery("");
    setSearchResults([]);
    setCurrentBooks([...userBooksObj[activeTab]]);
  };

  const handleDeleteBook = (book) => {
    const updatedBooks = userBooksObj[activeTab].filter(
      (b) => b.bookId !== book.bookId
    );
    userBooksObj[activeTab] = updatedBooks;
    setCurrentBooks([...updatedBooks]);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const handleBookClick = (bookId) => {
    setSelectedBookId(bookId);
  };

  const handleCloseBookDetails = () => {
    setSelectedBookId(null);
  };

  return (
    <>
      <div className="book-search">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a book..."
        />
        <button onClick={handleSearchBooks}>Search</button>
        <ul>
          {searchResults.map((book, index) => (
            <li key={index}>
              📚 {book.volumeInfo.title}{" "}
              <div className="book-buttons">
                <button onClick={() => handleAddBookFromSearch(book)}>
                  Add to {activeTab}
                </button>
                <button onClick={() => handleBookClick(book.id)}>
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="tabs-container">
        <div className="tab-navigation">
          <button
            className={activeTab === "wantToRead" ? "active" : ""}
            onClick={() => handleTabClick("wantToRead")}
          >
            Want to Read
          </button>
          <button
            className={activeTab === "reading" ? "active" : ""}
            onClick={() => handleTabClick("reading")}
          >
            Reading
          </button>
          <button
            className={activeTab === "read" ? "active" : ""}
            onClick={() => handleTabClick("read")}
          >
            Read
          </button>
        </div>

        <div className="tab-content">
          <div
            className={
              activeTab === "wantToRead" ? "tab-panel active" : "tab-panel"
            }
          >
            <h2>Books I Want to Read</h2>
            <ul>
              {currentBooks.length > 0 ? (
                currentBooks.map((book, index) => (
                  <li key={index}>
                    📚 {book.title}{" "}
                    <div className="book-buttons">
                      <button
                        className="details-buttom"
                        onClick={() => handleBookClick(book.bookId)}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book)}
                        className="delete-button"
                      >
                        ❌
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li></li>
              )}
            </ul>
          </div>

          <div
            className={
              activeTab === "reading" ? "tab-panel active" : "tab-panel"
            }
          >
            <h2>Currently Reading</h2>
            <ul>
              {currentBooks.length > 0 ? (
                currentBooks.map((book, index) => (
                  <li key={index}>
                    📚 {book.title}{" "}
                    <div className="book-buttons">
                      <button
                        className="details-buttom"
                        onClick={() => handleBookClick(book.bookId)}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book)}
                        className="delete-button"
                      >
                        ❌
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li></li>
              )}
            </ul>
          </div>

          <div
            className={activeTab === "read" ? "tab-panel active" : "tab-panel"}
          >
            <h2>Books I've Read</h2>
            <ul>
              {currentBooks.length > 0 ? (
                currentBooks.map((book, index) => (
                  <li key={index}>
                    📚 {book.title}{" "}
                    <div className="book-buttons">
                      <button
                        className="details-buttom"
                        onClick={() => handleBookClick(book.bookId)}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book)}
                        className="delete-button"
                      >
                        ❌
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li></li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {selectedBookId && (
        <BookDetails bookId={selectedBookId} onClose={handleCloseBookDetails} />
      )}
    </>
  );
};

export default BooksTabs;
