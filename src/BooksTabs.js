import React, { useState } from "react";
import "./BooksTabs.css";

const BooksTabs = () => {
  const currentUser = localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem("userData"));
  const userBooksObj = userData[currentUser]["books"];
  const [activeTab, setActiveTab] = useState("wantToRead");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
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
                <li key={index}>📚 {book}</li>
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
                <li key={index}>📚 {book}</li>
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
                <li key={index}>📚 {book}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BooksTabs;
