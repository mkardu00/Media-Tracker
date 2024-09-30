import React, { useState } from "react";
import "./BooksTabs.css";

const MoviesTabs = () => {
  const currentUser = localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem("userData"));
  const userMoviesObj = userData[currentUser]["movies"];
  const [activeTab, setActiveTab] = useState("favorites");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tabs-container">
      <div className="tab-navigation">
        <button
          className={activeTab === "favorites" ? "active" : ""}
          onClick={() => handleTabClick("favorites")}
        >
          Favorite
        </button>
        <button
          className={activeTab === "recentlyWatched" ? "active" : ""}
          onClick={() => handleTabClick("recentlyWatched")}
        >
          Recently Watched
        </button>
        <button
          className={activeTab === "toWatch" ? "active" : ""}
          onClick={() => handleTabClick("toWatch")}
        >
          To Watchh
        </button>
      </div>

      <div className="tab-content">
        <div
          className={
            activeTab === "favorites" ? "tab-panel active" : "tab-panel"
          }
        >
          <h2> Favorite Movies</h2>
          <ul>
            {userMoviesObj.favorites.map((movie, index) => (
              <li key={index}>🎬 {movie}</li>
            ))}
          </ul>
        </div>

        <div
          className={
            activeTab === "recentlyWatched" ? "tab-panel active" : "tab-panel"
          }
        >
          <h2> Movies I Have Watched</h2>
          <ul>
            {userMoviesObj.recentlyWatched.map((movie, index) => (
              <li key={index}>🎬 {movie}</li>
            ))}
          </ul>
        </div>

        <div
          className={activeTab === "toWatch" ? "tab-panel active" : "tab-panel"}
        >
          <h2> Movies I Would Like to Watch</h2>
          <ul>
            {userMoviesObj.toWatch.map((movie, index) => (
              <li key={index}>🎬 {movie}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MoviesTabs;
