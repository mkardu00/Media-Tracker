import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BooksTabs.css";
import MediaDetails from "./MediaDetails";
import Recommended from "./Recommended";
import StarRating from "./StarRating";

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
        console.error("Error fetching video games:", error);
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

        if (gameDetails.genres && gameDetails.genres.length > 0) {
          const genreId = gameDetails.genres[0].id;

          const recommendedResponse = await axios.get(
            `https://api.rawg.io/api/games?genres=${genreId}&key=${API_KEY}&rating=4`
          );
          const recommendedGamesData = recommendedResponse.data.results || [];

          setRecommendedGames(recommendedGamesData);
        } else {
          setRecommendedGames([]);
        }
      } catch (error) {
        console.error(
          "Error fetching game details or recommended games:",
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
      developer: game.developers?.[0]?.name || "Unknown Developer",
      cover: game.background_image || "",
      avgRating: game.rating || "N/A",
      userRating: 0,
    };

    if (userGamesObj[activeTab].some((g) => g.gameId === gameToAdd.gameId)) {
      alert("Game already exists in your list.");
      return;
    }

    userGamesObj[activeTab].push(gameToAdd);
    userData[currentUser].games = userGamesObj;
    localStorage.setItem("userData", JSON.stringify(userData));

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

  const handleUserRatingChange = (gameId, rating) => {
    const updatedGames = currentGames.map((game) =>
      game.gameId === gameId ? { ...game, userRating: rating } : game
    );
    setCurrentGames(updatedGames);
  };

  return (
    <>
      <div className="book-search">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleKeyPress}
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
          <table className="books-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Developer</th>
                <th>Average Rating</th>
                <th>Your Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentGames.map((game) => (
                <tr key={game.gameId}>
                  <td>
                    <img
                      src={game.cover}
                      alt={game.title}
                      className="book-cover"
                    />
                  </td>
                  <td>{game.title}</td>
                  <td>{game.developer}</td>
                  <td>{game.avgRating}</td>
                  <td>
                    <StarRating
                      rating={game.userRating}
                      onRatingChange={(rating) =>
                        handleUserRatingChange(game.gameId, rating)
                      }
                    />
                  </td>
                  <td>
                    <button onClick={() => handleGameClick(game.gameId)}>
                      Details
                    </button>
                    <button onClick={() => handleDeleteGame(game)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
