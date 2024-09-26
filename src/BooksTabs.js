import React, { useState } from "react";

const BooksTabs = () => {
  const [activeTab, setActiveTab] = useState("wantToRead");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
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
        {activeTab === "wantToRead" && (
          <div>
            <h2>Books I Want to Read</h2>
            <ul>
              <li>The Name of the Wind - Patrick Rothfuss</li>
              <li>The Night Circus - Erin Morgenstern</li>
              <li>Neverwhere - Neil Gaiman</li>
            </ul>
          </div>
        )}
        {activeTab === "reading" && (
          <div>
            <h2>Currently Reading</h2>
            <ul>
              <li>The Way of Kings - Brandon Sanderson</li>
              <li>The Catcher in the Rye - J.D. Salinger</li>
            </ul>
          </div>
        )}
        {activeTab === "read" && (
          <div>
            <h2>Books I've Read</h2>
            <ul>
              <li>1984 - George Orwell</li>
              <li>To Kill a Mockingbird - Harper Lee</li>
              <li>Harry Potter and the Philosopher's Stone - J.K. Rowling</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksTabs;
