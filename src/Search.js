import React from "react";
import "./BooksTabs.css";

const Search = ({
  searchQuery,
  setSearchQuery,
  handleSearchBooks,
  handleClearSearchResults,
  searchResults,
  handleAddBookFromSearch,
  handleBookClick,
  activeTab,
  handleKeyPress,
}) => {
  return (
    <div className="book-search">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for a book..."
      />
      <button onClick={handleSearchBooks}>Search</button>
      <button onClick={handleClearSearchResults}>Clear</button>
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
  );
};

export default Search;
