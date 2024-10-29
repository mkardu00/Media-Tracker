import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BooksTabs.css";
import MediaDetails from "./MediaDetails";
import Recommended from "./Recommended";

const VideoGames = () => {
  const currentUser = localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem("userData")) || {};

  const userGamesObj = userData[currentUser]?.games || {
    wantToPlay: [],
    playing: [],
    played: [],
  };

  const [activeTab, setActiveTab] = useState("wantToPlay");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [currentGames, setCurrentGames] = useState(userGamesObj[activeTab]);
  const [recommendedGames, setRecommendedGames] = useState([]);

  const API_KEY = process.env.REACT_APP_RAWG_API_KEY;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userGamesObj = userData[currentUser]?.games || {
      wantToPlay: [],
      playing: [],
      played: [],
    };
    setCurrentGames(userGamesObj[activeTab]);
    fetchRecommendedGames(userGamesObj[activeTab]);
  }, [activeTab, currentUser]);

  const handleSearchGames = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page_size=5&search=${searchQuery}`
        );
        setSearchResults(response.data.results || []);
      } catch (error) {
        console.error("Greška pri dohvaćanju video igara:", error);
      }
    }
  };

  const fetchRecommendedGames = async (games) => {
    if (games.length > 0) {
      const firstGameId = games[0].gameId;

      try {
        const gameDetailsResponse = await axios.get(
          `https://api.rawg.io/api/games/${firstGameId}?key=${API_KEY}`
        );
        const gameDetails = gameDetailsResponse.data;

        if (gameDetails.developers && gameDetails.developers.length > 0) {
          const developerId = gameDetails.developers[0].id;

          const recommendedResponse = await axios.get(
            `https://api.rawg.io/api/games?developers=${developerId}&key=${API_KEY}`
          );
          setRecommendedGames(recommendedResponse.data.results || []);
        } else {
          setRecommendedGames([]);
        }
      } catch (error) {
        console.error(
          "Greška pri dohvaćanju detalja igre ili preporučenih igara:",
          error
        );
      }
    } else {
      setRecommendedGames([]);
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddGameFromSearch = (game) => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userGamesObj = userData[currentUser]?.games || {
      wantToPlay: [],
      playing: [],
      played: [],
    };

    const gameToAdd = {
      title: game.name,
      gameId: game.id,
    };

    userGamesObj[activeTab].push(gameToAdd);
    userData[currentUser].games = userGamesObj;
    localStorage.setItem("userData", JSON.stringify(userData));

    alert(`Game "${game.name}" added to your ${activeTab} list.`);

    setSearchQuery("");
    setSearchResults([]);
    setCurrentGames([...userGamesObj[activeTab]]);
  };

  const handleDeleteGame = (game) => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userGamesObj = userData[currentUser]?.games || {
      wantToPlay: [],
      playing: [],
      played: [],
    };

    const updatedGames = userGamesObj[activeTab].filter(
      (g) => g.gameId !== game.gameId
    );
    userGamesObj[activeTab] = updatedGames;
    userData[currentUser].games = userGamesObj;
    localStorage.setItem("userData", JSON.stringify(userData));

    setCurrentGames([...updatedGames]);
  };

  const handleGameClick = (gameId) => {
    setSelectedGameId(gameId);
  };

  const handleCloseDetails = () => {
    setSelectedGameId(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchGames();
    }
  };

  const handleClearSearchResults = () => {
    setSearchResults([]);
    setSearchQuery("");
  };

  return (
    <>
      <div className="book-search">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for a video game..."
        />
        <button onClick={handleSearchGames}>Search</button>
        <button onClick={handleClearSearchResults}>Clear</button>
        <ul>
          {searchResults.map((game, index) => (
            <li key={index}>
              🎮 {game.name}{" "}
              <div className="book-buttons">
                <button onClick={() => handleAddGameFromSearch(game)}>
                  Add to {activeTab}
                </button>
                <button onClick={() => handleGameClick(game.id)}>
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="tabs-container">
        <div className="tab-navigation">
          <button
            className={activeTab === "wantToPlay" ? "active" : ""}
            onClick={() => handleTabClick("wantToPlay")}
          >
            Want to Play
          </button>
          <button
            className={activeTab === "playing" ? "active" : ""}
            onClick={() => handleTabClick("playing")}
          >
            Playing
          </button>
          <button
            className={activeTab === "played" ? "active" : ""}
            onClick={() => handleTabClick("played")}
          >
            Played
          </button>
        </div>

        <div className="tab-content">
          <div
            className={
              activeTab === "wantToPlay" ? "tab-panel active" : "tab-panel"
            }
          >
            <h2>Games I Want to Play</h2>
            <ul>
              {currentGames.length > 0 ? (
                currentGames.map((game, index) => (
                  <li key={index}>
                    🎮 {game.title}{" "}
                    <div className="book-buttons">
                      <button
                        className="details-buttom"
                        onClick={() => handleGameClick(game.gameId)}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDeleteGame(game)}
                        className="delete-button"
                      >
                        ❌
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li></li>
              )}
            </ul>
          </div>

          <div
            className={
              activeTab === "playing" ? "tab-panel active" : "tab-panel"
            }
          >
            <h2>Currently Playing</h2>
            <ul>
              {currentGames.length > 0 ? (
                currentGames.map((game, index) => (
                  <li key={index}>
                    🎮 {game.title}{" "}
                    <div className="book-buttons">
                      <button
                        className="details-buttom"
                        onClick={() => handleGameClick(game.gameId)}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDeleteGame(game)}
                        className="delete-button"
                      >
                        ❌
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li></li>
              )}
            </ul>
          </div>

          <div
            className={
              activeTab === "played" ? "tab-panel active" : "tab-panel"
            }
          >
            <h2>Games I've Played</h2>
            <ul>
              {currentGames.length > 0 ? (
                currentGames.map((game, index) => (
                  <li key={index}>
                    🎮 {game.title}{" "}
                    <div className="book-buttons">
                      <button
                        className="details-buttom"
                        onClick={() => handleGameClick(game.gameId)}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDeleteGame(game)}
                        className="delete-button"
                      >
                        ❌
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li></li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Recommended recommendedMedia={recommendedGames} mediaType="game" />
      {selectedGameId && (
        <MediaDetails
          mediaId={selectedGameId}
          mediaType="game"
          onClose={handleCloseDetails}
        />
      )}
    </>
  );
};

export default VideoGames;
