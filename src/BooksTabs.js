import React, { useState } from "react";
import "./BooksTabs.css";

const BooksTabs = () => {
  const currentUser = localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem("userData"));
  const userBooksObj = userData[currentUser]["books"];
  const [activeTab, setActiveTab] = useState("wantToRead");

  const [newBook, setNewBook] = useState("");
  const [bookType, setBookType] = useState("wantToRead");

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
        <input
          type="text"
          value={newBook}
          onChange={(e) => setNewBook(e.target.value)}
          placeholder="Enter book title"
        />
        <select onChange={(e) => setBookType(e.target.value)} value={bookType}>
          <option value="wantToRead">Want to Read</option>
          <option value="reading">Reading</option>
          <option value="read">Read</option>
        </select>
        <button onClick={handleAddBook}>Add Book</button>
      </div>
    </div>
  );
};

export default BooksTabs;
