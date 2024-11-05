import React from "react";
import "./BooksTabs.css";

const Search = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleClearSearchResults,
  searchResults,
  handleAddMediaFromSearch,
  handleMediaClick,
  activeTab,
  handleKeyPress,
  mediaType,
}) => {
  return (
    <div className="book-search">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleKeyPress(e)}
        placeholder={`Search for a ${mediaType}...`}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClearSearchResults}>Clear</button>
      <ul>
        {searchResults.map((item, index) => (
          <li key={index}>
            {mediaType === "book"
              ? "📚 "
              : mediaType === "movie"
              ? "🎬 "
              : mediaType === "game"
              ? "🎮 "
              : ""}
            {item.volumeInfo?.title || item.Title || item.name}{" "}
            <div className="book-buttons">
              <button onClick={() => handleAddMediaFromSearch(item)}>
                Add to {activeTab}
              </button>
              <button
                onClick={() =>
                  handleMediaClick(item.id || item.imdbID || item.gameId)
                }
              >
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
