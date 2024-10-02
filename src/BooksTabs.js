import React, { useState } from "react";
import axios from "axios";
import "./BooksTabs.css";

const BooksTabs = () => {
  const currentUser = localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem("userData"));
  const userBooksObj = userData[currentUser]["books"];
  const [activeTab, setActiveTab] = useState("wantToRead");

  const [newBook, setNewBook] = useState("");
  const [bookType, setBookType] = useState("wantToRead");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const API_KEY = "AIzaSyCdzA_eB37gQSkL93HD-wmMeKIUM7fLeAk"; // API ključem

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

  const handleAddBook = () => {
    if (newBook.trim() !== "") {
      userBooksObj[bookType].push(newBook);
      localStorage.setItem("userData", JSON.stringify(userData));
      setNewBook("");
    }
  };

  const handleAddBookFromSearch = (bookTitle) => {
    userBooksObj[bookType].push(bookTitle);
    localStorage.setItem("userData", JSON.stringify(userData));
    alert(`Book "${bookTitle}" added to your ${bookType} list.`);
  };

  const handleDeleteBook = (book) => {
    const updatedBooks = userBooksObj[activeTab].filter((b) => b !== book);
    userBooksObj[activeTab] = updatedBooks;
    localStorage.setItem("userData", JSON.stringify(userData));
    setActiveTab(activeTab);
  };

  return (
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
            {Object.keys(userBooksObj).length !== 0 &&
              userBooksObj.wantToRead.map((book, index) => (
                <li key={index}>
                  📚 {book}{" "}
                  <button
                    onClick={() => handleDeleteBook(book)}
                    className="delete-button"
                  >
                    ❌
                  </button>
                </li>
              ))}
          </ul>
        </div>

        <div
          className={activeTab === "reading" ? "tab-panel active" : "tab-panel"}
        >
          <h2>Currently Reading</h2>
          <ul>
            {Object.keys(userBooksObj).length !== 0 &&
              userBooksObj.reading.map((book, index) => (
                <li key={index}>
                  📚 {book}{" "}
                  <button
                    onClick={() => handleDeleteBook(book)}
                    className="delete-button"
                  >
                    ❌
                  </button>
                </li>
              ))}
          </ul>
        </div>

        <div
          className={activeTab === "read" ? "tab-panel active" : "tab-panel"}
        >
          <h2>Books I've Read</h2>
          <ul>
            {Object.keys(userBooksObj).length !== 0 &&
              userBooksObj.read.map((book, index) => (
                <li key={index}>
                  📚 {book}{" "}
                  <button
                    onClick={() => handleDeleteBook(book)}
                    className="delete-button"
                  >
                    ❌
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="add-book">
        <select onChange={(e) => setBookType(e.target.value)} value={bookType}>
          <option value="wantToRead">Want to Read</option>
          <option value="reading">Reading</option>
          <option value="read">Read</option>
        </select>{" "}
        <div className="book-search">
          <h2>Search for books</h2>
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
                <button
                  onClick={() => handleAddBookFromSearch(book.volumeInfo.title)}
                >
                  Add to {bookType}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BooksTabs;
