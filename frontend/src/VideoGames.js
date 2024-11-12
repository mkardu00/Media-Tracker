import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BooksTabs.css";
import MediaDetails from "./MediaDetails";
import Recommended from "./Recommended";
import StarRating from "./StarRating";
import Search from "./Search";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { format } from "date-fns";

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

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

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
          `${BASE_URL}/api/gamesearch?query=${searchQuery}`
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
          `${BASE_URL}/api/gamedetails?gameId=${firstGameId}`
        );
        const gameDetails = gameDetailsResponse.data;

        if (gameDetails.genres && gameDetails.genres.length > 0) {
          const genreId = gameDetails.genres[0].id;

          const recommendedResponse = await axios.get(
            `${BASE_URL}/api/recommendedgames?genreId=${genreId}`
          );
          setRecommendedGames(recommendedResponse.data.results || []);
        } else {
          setRecommendedGames([]);
        }
      } catch (error) {
        console.error("Error fetching recommended games:", error);
      }
    } else {
      setRecommendedGames([]);
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddGameFromSearch = async (game) => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userGamesObj = userData[currentUser]?.games || {
      wantToPlay: [],
      playing: [],
      played: [],
    };

    let developerName = game.developers?.[0]?.name || "Unknown Developer";

    if (developerName === "Unknown Developer") {
      try {
        const detailsResponse = await axios.get(
          `${BASE_URL}/api/gamedetails?gameId=${game.id}`
        );
        developerName =
          detailsResponse.data.developers?.[0]?.name || "Unknown Developer";
      } catch (error) {
        console.error("Error fetching developer details:", error);
      }
    }

    const gameToAdd = {
      title: game.name,
      gameId: game.id,
      developer: developerName,
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
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userGamesObj = userData[currentUser]?.games || {
      wantToPlay: [],
      playing: [],
      played: [],
    };

    const updatedGames = currentGames.map((game) =>
      game.gameId === gameId ? { ...game, userRating: rating } : game
    );
    setCurrentGames(updatedGames);

    userGamesObj[activeTab] = userGamesObj[activeTab].map((game) =>
      game.gameId === gameId ? { ...game, userRating: rating } : game
    );

    userData[currentUser].games = userGamesObj;
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  return (
    <>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearchGames}
        handleClearSearchResults={handleClearSearchResults}
        searchResults={searchResults}
        handleAddMediaFromSearch={handleAddGameFromSearch}
        handleMediaClick={handleGameClick}
        activeTab={activeTab}
        handleKeyPress={handleKeyPress}
        mediaType="game"
      />
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
                      mediaId={game.gameId}
                      onRatingChange={handleUserRatingChange}
                      initialRating={game.userRating}
                    />
                  </td>
                  <td>
                    <button
                      className="details-books-button"
                      onClick={() => handleGameClick(game.gameId)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteGame(game)}
                    >
                      {" "}
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Recommended
        recommendedMedia={recommendedGames}
        mediaType="game"
        handleAddMedia={handleAddGameFromSearch}
      />
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
