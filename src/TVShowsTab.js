import React, { useState } from "react";
import "./BooksTabs.css";

const TVShowsTabs = () => {
  const currentUser = localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem("userData"));
  const userShowsObj = userData[currentUser]["tvShows"];
  const [activeTab, setActiveTab] = useState("recentlyWatched");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tabs-container">
      <div className="tab-navigation">
        <button
          className={activeTab === "recentlyWatched" ? "active" : ""}
          onClick={() => handleTabClick("recentlyWatched")}
        >
          Recently Watched
        </button>
        <button
          className={activeTab === "currentlyWatching" ? "active" : ""}
          onClick={() => handleTabClick("currentlyWatching")}
        >
          Currently Watching
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
            activeTab === "recentlyWatched" ? "tab-panel active" : "tab-panel"
          }
        >
          <h2> The TV shows I have watched</h2>
          <ul>
            {userShowsObj.recentlyWatched.map((show, index) => (
              <li key={index}>📺 {show}</li>
            ))}
          </ul>
        </div>

        <div
          className={
            activeTab === "currentlyWatching" ? "tab-panel active" : "tab-panel"
          }
        >
          <h2> The TV shows I am currently watching</h2>
          <ul>
            {userShowsObj.currentlyWatching.map((show, index) => (
              <li key={index}>📺 {show}</li>
            ))}
          </ul>
        </div>

        <div
          className={activeTab === "toWatch" ? "tab-panel active" : "tab-panel"}
        >
          <h2> The TV shows I would like to watch.</h2>
          <ul>
            {userShowsObj.toWatch.map((show, index) => (
              <li key={index}>📺 {show}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TVShowsTabs;
