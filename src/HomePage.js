import React from "react";
import "./HomePage.css"; // Stilovi za HomePage komponentu

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="content">
        <h1>Welcome to Media Tracker</h1>
        <p>
          Your journey starts here. Discover books, movies, tv shows and video
          games.
        </p>
        <div className="buttons">
          <button className="btn signup-btn">Sign Up</button>
          <button className="btn signin-btn">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
