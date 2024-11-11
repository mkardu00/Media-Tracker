import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BooksTabs.css";
import MediaDetails from "./MediaDetails";
import Recommended from "./Recommended";
import Search from "./Search";
import StarRating from "./StarRating";
import { FaEye, FaTrashAlt, FaCheckCircle } from "react-icons/fa";

const Books = () => {
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
  const [currentBooks, setCurrentBooks] = useState(userBooksObj[activeTab]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userBooksObj = userData[currentUser]?.books || {
      wantToRead: [],
      reading: [],
      read: [],
    };
    setCurrentBooks(userBooksObj[activeTab]);
    fetchRecommendedBooks(userBooksObj[activeTab]);
  }, [activeTab, currentUser]);

  const handleSearchBooks = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/booksearch?query=${searchQuery}`
        );
        setSearchResults(response.data.items || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
  };

  const fetchRecommendedBooks = async (books) => {
    if (books.length > 0) {
      const firstBook = books[0];
      const author = firstBook.author;

      if (author) {
        try {
          const response = await axios.get(
            `${BASE_URL}/api/recommendedbooks?author=${author}`
          );

          const filteredBooks =
            response.data.items?.filter(
              (book) => book.volumeInfo.averageRating >= 4
            ) || [];

          setRecommendedBooks(filteredBooks);
        } catch (error) {
          console.error("Error fetching recommended books:", error);
          setRecommendedBooks([]);
        }
      } else {
        setRecommendedBooks([]);
      }
    } else {
      setRecommendedBooks([]);
    }
  };
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddBookFromSearch = (book) => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userBooksObj = userData[currentUser]?.books || {
      wantToRead: [],
      reading: [],
      read: [],
    };

    const bookToAdd = {
      title: book.volumeInfo.title,
      bookId: book.id,
      author: book.volumeInfo.authors?.[0] || "Unknown",
      cover: book.volumeInfo.imageLinks?.thumbnail,
      avgRating: book.volumeInfo.averageRating || "N/A",
      userRating: 0,
      startDate:
        activeTab === "reading" ? new Date().toISOString().split("T")[0] : null,
      endDate:
        activeTab === "read" ? new Date().toISOString().split("T")[0] : null,
    };

    if (userBooksObj[activeTab].some((b) => b.bookId === bookToAdd.bookId)) {
      alert("Book already exists in your list.");
      return;
    }

    userBooksObj[activeTab].push(bookToAdd);
    userData[currentUser].books = userBooksObj;
    localStorage.setItem("userData", JSON.stringify(userData));
    setSearchQuery("");
    setSearchResults([]);
    setCurrentBooks([...userBooksObj[activeTab]]);
  };

  const handleDeleteBook = (book) => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userBooksObj = userData[currentUser]?.books || {
      wantToRead: [],
      reading: [],
      read: [],
    };

    const updatedBooks = userBooksObj[activeTab].filter(
      (b) => b.bookId !== book.bookId
    );
    userBooksObj[activeTab] = updatedBooks;
    userData[currentUser].books = userBooksObj;
    localStorage.setItem("userData", JSON.stringify(userData));

    setCurrentBooks([...updatedBooks]);
  };

  const handleBookClick = (bookId) => {
    setSelectedBookId(bookId);
  };

  const handleCloseDetails = () => {
    setSelectedBookId(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchBooks();
    }
  };

  const handleClearSearchResults = () => {
    setSearchResults([]);
    setSearchQuery("");
  };

  const handleUserRatingChange = (bookId, rating) => {
    const updatedBooks = currentBooks.map((book) =>
      book.bookId === bookId ? { ...book, userRating: rating } : book
    );

    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userBooksObj = userData[currentUser]?.books || {
      wantToRead: [],
      reading: [],
      read: [],
    };

    userBooksObj[activeTab] = updatedBooks;
    userData[currentUser].books = userBooksObj;
    localStorage.setItem("userData", JSON.stringify(userData));

    setCurrentBooks(updatedBooks);
  };

  const handleMarkAsRead = (book) => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userBooksObj = userData[currentUser]?.books || {
      wantToRead: [],
      reading: [],
      read: [],
    };

    const updatedBook = {
      ...book,
      endDate: new Date().toISOString().split("T")[0],
    };
    userBooksObj.read.push(updatedBook);
    userBooksObj.reading = userBooksObj.reading.filter(
      (b) => b.bookId !== book.bookId
    );

    userData[currentUser].books = userBooksObj;
    localStorage.setItem("userData", JSON.stringify(userData));
    setCurrentBooks([...userBooksObj[activeTab]]);
  };

  const handleMoveToReading = (book) => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userBooksObj = userData[currentUser]?.books || {
      wantToRead: [],
      reading: [],
      read: [],
    };

    const updatedBook = {
      ...book,
      startDate: new Date().toISOString().split("T")[0],
    };

    userBooksObj.reading.push(updatedBook);
    userBooksObj.wantToRead = userBooksObj.wantToRead.filter(
      (b) => b.bookId !== book.bookId
    );

    userData[currentUser].books = userBooksObj;
    localStorage.setItem("userData", JSON.stringify(userData));
    setCurrentBooks([...userBooksObj[activeTab]]);
  };

  return (
    <>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearchBooks}
        handleClearSearchResults={handleClearSearchResults}
        searchResults={searchResults}
        handleAddMediaFromSearch={handleAddBookFromSearch}
        handleMediaClick={handleBookClick}
        activeTab={activeTab}
        handleKeyPress={handleKeyPress}
        mediaType="book"
      />

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
          <table className="books-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Average Rating</th>
                <th>Your Rating</th>
                <th>Progress</th>
                {activeTab === "reading" && <th>Start Date</th>}
                {activeTab === "read" && <th>End Date</th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book) => (
                <tr key={book.bookId}>
                  <td>
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="book-cover"
                    />
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.avgRating}</td>
                  <td>
                    <StarRating
                      mediaId={book.bookId}
                      onRatingChange={handleUserRatingChange}
                      initialRating={book.userRating}
                    />
                  </td>
                  <td>
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{
                          width:
                            activeTab === "wantToRead"
                              ? "33%"
                              : activeTab === "reading"
                              ? "66%"
                              : "100%",
                        }}
                      ></div>
                    </div>
                  </td>
                  {activeTab === "reading" && <td>{book.startDate}</td>}
                  {activeTab === "read" && <td>{book.endDate}</td>}
                  <td>
                    {activeTab === "wantToRead" && (
                      <button
                        className="details-books-button"
                        onClick={() => handleMoveToReading(book)}
                      >
                        <FaCheckCircle /> Move to Reading
                      </button>
                    )}
                    {activeTab === "reading" && (
                      <button
                        className="details-books-button"
                        onClick={() => handleMarkAsRead(book)}
                      >
                        <FaCheckCircle /> Mark as Read
                      </button>
                    )}
                    <button
                      className="details-books-button"
                      onClick={() => handleBookClick(book.bookId)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteBook(book)}
                    >
                      <FaTrashAlt />
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
        mediaType="book"
        handleAddMedia={handleAddBookFromSearch}
      />
      {selectedBookId && (
        <MediaDetails
          mediaId={selectedBookId}
          mediaType="book"
          onClose={handleCloseDetails}
        />
      )}
    </>
  );
};

export default Books;
