import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BooksTabs.css";
import MediaDetails from "./MediaDetails";
import Recommended from "./Recommended";

const Movies = () => {
  const currentUser = localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem("userData")) || {};

  const userMoviesObj = userData[currentUser]?.movies || {
    favorites: [],
    recentlyWatched: [],
    toWatch: [],
  };

  const [activeTab, setActiveTab] = useState("favorites");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [currentMovies, setCurrentMovies] = useState(userMoviesObj[activeTab]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userMoviesObj = userData[currentUser]?.movies || {
      favorites: [],
      recentlyWatched: [],
      toWatch: [],
    };
    setCurrentMovies(userMoviesObj[activeTab]);
    fetchRecommendedMovies(userMoviesObj[activeTab]);
  }, [activeTab, currentUser]);

  const handleSearchMovies = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`
        );
        setSearchResults(response.data.Search || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
  };

  const fetchRecommendedMovies = async (movies) => {
    if (movies.length > 0) {
      const firstMovieId = movies[0].movieId;

      try {
        const movieDetailsResponse = await axios.get(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${firstMovieId}`
        );
        const movieDetails = movieDetailsResponse.data;

        if (movieDetails.Genre) {
          const genre = movieDetails.Genre.split(", ")[0];

          const recommendedResponse = await axios.get(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${genre}`
          );
          setRecommendedMovies(recommendedResponse.data.Search || []);
        } else {
          setRecommendedMovies([]);
        }
      } catch (error) {
        console.error("Error fetching recommended movies:", error);
      }
    } else {
      setRecommendedMovies([]);
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddMovieFromSearch = (movie) => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userMoviesObj = userData[currentUser]?.movies || {
      favorites: [],
      recentlyWatched: [],
      toWatch: [],
    };

    const movieToAdd = {
      title: movie.Title,
      movieId: movie.imdbID,
    };

    userMoviesObj[activeTab].push(movieToAdd);
    userData[currentUser].movies = userMoviesObj;
    localStorage.setItem("userData", JSON.stringify(userData));

    alert(`Movie "${movie.Title}" added to your ${activeTab} list.`);

    setSearchQuery("");
    setSearchResults([]);
    setCurrentMovies([...userMoviesObj[activeTab]]);
  };

  const handleDeleteMovie = (movie) => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userMoviesObj = userData[currentUser]?.movies || {
      favorites: [],
      recentlyWatched: [],
      toWatch: [],
    };

    const updatedMovies = userMoviesObj[activeTab].filter(
      (m) => m.movieId !== movie.movieId
    );
    userMoviesObj[activeTab] = updatedMovies;
    userData[currentUser].movies = userMoviesObj;
    localStorage.setItem("userData", JSON.stringify(userData));

    setCurrentMovies([...updatedMovies]);
  };

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseDetails = () => {
    setSelectedMovieId(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchMovies();
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
          placeholder="Search for a movie..."
        />
        <button onClick={handleSearchMovies}>Search</button>
        <button onClick={handleClearSearchResults}>Clear</button>
        <ul>
          {searchResults.map((movie, index) => (
            <li key={index}>
              🎬 {movie.Title}
              <div className="book-buttons">
                <button onClick={() => handleAddMovieFromSearch(movie)}>
                  Add to {activeTab}
                </button>
                <button onClick={() => handleMovieClick(movie.imdbID)}>
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
            className={activeTab === "favorites" ? "active" : ""}
            onClick={() => handleTabClick("favorites")}
          >
            Favorites
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
            To Watch
          </button>
        </div>

        <div className="tab-content">
          <div
            className={
              activeTab === "favorites" ? "tab-panel active" : "tab-panel"
            }
          >
            <h2>Favorite Movies</h2>
            <ul>
              {currentMovies.length > 0 ? (
                currentMovies.map((movie, index) => (
                  <li key={index}>
                    🎬 {movie.title}
                    <div className="book-buttons">
                      <button
                        className="details-buttom"
                        onClick={() => handleMovieClick(movie.movieId)}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDeleteMovie(movie)}
                        className="delete-button"
                      >
                        ❌
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li>No movies in this list.</li>
              )}
            </ul>
          </div>

          <div
            className={
              activeTab === "recentlyWatched" ? "tab-panel active" : "tab-panel"
            }
          >
            <h2>Movies I Have Watched</h2>
            <ul>
              {currentMovies.length > 0 ? (
                currentMovies.map((movie, index) => (
                  <li key={index}>
                    🎬 {movie.title}{" "}
                    <div className="book-buttons">
                      <button
                        className="details-buttom"
                        onClick={() => handleMovieClick(movie.movieId)}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDeleteMovie(movie)}
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
              activeTab === "toWatch" ? "tab-panel active" : "tab-panel"
            }
          >
            <h2> Movies I Would Like to Watch</h2>
            <ul>
              {currentMovies.length > 0 ? (
                currentMovies.map((movie, index) => (
                  <li key={index}>
                    🎬 {movie.title}{" "}
                    <div className="book-buttons">
                      <button
                        className="details-buttom"
                        onClick={() => handleMovieClick(movie.movieId)}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDeleteMovie(movie)}
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

      <Recommended recommendedMedia={recommendedMovies} mediaType="movie" />
      {selectedMovieId && (
        <MediaDetails
          mediaId={selectedMovieId}
          mediaType="movie"
          onClose={handleCloseDetails}
        />
      )}
    </>
  );
};

export default Movies;
