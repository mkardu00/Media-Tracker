import React, { useState } from "react";
import "./BooksTabs.css";

const VideoGamesTabs = () => {
  const currentUser = localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem("userData"));
  const userGamesObj = userData[currentUser]["videoGames"];
  const [activeTab, setActiveTab] = useState("wantToPlay");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tabs-container">
      <div className="tab-navigation">
        <button
          className={activeTab === "wantToPlay" ? "active" : ""}
          onClick={() => handleTabClick("wantToPlay")}
        >
          Want to play
        </button>
        <button
          className={activeTab === "currentlyPlaying" ? "active" : ""}
          onClick={() => handleTabClick("currentlyPlaying")}
        >
          Playing
        </button>
        <button
          className={activeTab === "alreadyPlayed" ? "active" : ""}
          onClick={() => handleTabClick("alreadyPlayed")}
        >
          Already Played
        </button>
      </div>

      <div className="tab-content">
        <div
          className={
            activeTab === "wantToPlay" ? "tab-panel active" : "tab-panel"
          }
        >
          <h2>The video games I want to play</h2>
          <ul>
            {userGamesObj.wantToPlay.map((game, index) => (
              <li key={index}>🎮 {game}</li>
            ))}
          </ul>
        </div>

        <div
          className={
            activeTab === "currentlyPlaying" ? "tab-panel active" : "tab-panel"
          }
        >
          <h2>The video games I am currently playing</h2>
          <ul>
            {userGamesObj.currentlyPlaying.map((game, index) => (
              <li key={index}>🎮 {game}</li>
            ))}
          </ul>
        </div>

        <div
          className={
            activeTab === "alreadyPlayed" ? "tab-panel active" : "tab-panel"
          }
        >
          <h2>The video games I have already played</h2>
          <ul>
            {userGamesObj.alreadyPlayed.map((game, index) => (
              <li key={index}>🎮 {game}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoGamesTabs;
