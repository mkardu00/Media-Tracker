import React from "react";
import MoviesTabs from "./MoviesTabs";
import "./Books.css";

const Movies = () => {
  return (
    <div>
      <div className="search-section">
        <MoviesTabs />
      </div>
    </div>
  );
};

export default Movies;
