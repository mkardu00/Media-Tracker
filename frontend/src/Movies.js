import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BooksTabs.css";
import MediaDetails from "./MediaDetails";
import Recommended from "./Recommended";
import StarRating from "./StarRating";
import Search from "./Search";
import { FaEye, FaTrashAlt } from "react-icons/fa";

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
  const [genreFilter, setGenreFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userMoviesObj = userData[currentUser]?.movies || {
      favorites: [],
      recentlyWatched: [],
      toWatch: [],
    };
    const filteredMovies = applyFilters(userMoviesObj[activeTab]);
    setCurrentMovies(filteredMovies);
    fetchRecommendedMovies(userMoviesObj[activeTab]);
  }, [activeTab, currentUser, genreFilter, ratingFilter]);

  const handleSearchMovies = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/moviesearch?query=${searchQuery}`
        );
        console.log("Search results", response.data);
        setSearchResults(response.data.Search || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
  };
  const fetchRecommendedMovies = async (movies) => {
    if (movies.length > 0) {
      const firstMovie = movies[0];
      const genre = firstMovie.genre.split(",")[1].trim();
      try {
        const response = await axios.get(
          `${BASE_URL}/api/recommendedmovies?genre=${genre}`
        );
        setRecommendedMovies(response.data.Search || []);
      } catch (error) {
        console.error("Error fetching recommended movies:", error);
      }
    } else {
      setRecommendedMovies([]);
    }
  };
  const applyFilters = (movies) => {
    return movies.filter((movie) => {
      const genreMatch = genreFilter
        ? movie.genre?.includes(genreFilter)
        : true;

      const avgRating = parseFloat(movie.avgRating);
      const ratingMatch = ratingFilter > 0 ? avgRating >= ratingFilter : true;

      return genreMatch && ratingMatch;
    });
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddMovieFromSearch = async (movie) => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userMoviesObj = userData[currentUser]?.movies || {
      favorites: [],
      recentlyWatched: [],
      toWatch: [],
    };

    if (userMoviesObj[activeTab].some((m) => m.movieId === movie.imdbID)) {
      alert("Movie already exists in your list.");
      return;
    }

    try {
      const movieDetailsResponse = await axios.get(
        `${BASE_URL}/api/moviedetails?movieId=${movie.imdbID}`
      );
      const movieDetails = movieDetailsResponse.data;

      const movieToAdd = {
        title: movie.Title,
        movieId: movie.imdbID,
        cover: movie.Poster || "",
        avgRating: movieDetails.imdbRating || "N/A",
        userRating: 0,
        genre: movieDetails.Genre || "N/A",
        director:
          movieDetails.Director !== "N/A"
            ? movieDetails.Director
            : movieDetails.Writer || "N/A",
      };

      userMoviesObj[activeTab].push(movieToAdd);
      userData[currentUser].movies = userMoviesObj;
      localStorage.setItem("userData", JSON.stringify(userData));

      setSearchQuery("");
      setSearchResults([]);
      setCurrentMovies([...userMoviesObj[activeTab]]);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
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

  const handleUserRatingChange = (movieId, rating) => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userMoviesObj = userData[currentUser]?.movies || {
      favorites: [],
      recentlyWatched: [],
      toWatch: [],
    };

    const updatedMovies = currentMovies.map((movie) =>
      movie.movieId === movieId ? { ...movie, userRating: rating } : movie
    );

    userMoviesObj[activeTab] = userMoviesObj[activeTab].map((movie) =>
      movie.movieId === movieId ? { ...movie, userRating: rating } : movie
    );

    userData[currentUser].movies = userMoviesObj;
    localStorage.setItem("userData", JSON.stringify(userData));

    setCurrentMovies(updatedMovies);
  };

  return (
    <>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearchMovies}
        handleClearSearchResults={handleClearSearchResults}
        searchResults={searchResults}
        handleAddMediaFromSearch={handleAddMovieFromSearch}
        handleMediaClick={handleMovieClick}
        activeTab={activeTab}
        handleKeyPress={handleKeyPress}
        mediaType="movie"
      />

      <div className="filter-container">
        <select
          onChange={(e) => setGenreFilter(e.target.value)}
          value={genreFilter}
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Family">Family</option>
        </select>

        <select
          onChange={(e) => setRatingFilter(Number(e.target.value))}
          value={ratingFilter}
        >
          <option value={0}>All Ratings</option>
          <option value={5}>5 & Up</option>
          <option value={6}>6 & Up</option>
          <option value={7}>7 & Up</option>
          <option value={8}>8 & Up</option>
          <option value={9}>9 & Up</option>
        </select>
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
          <table className="books-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Director</th>
                <th>Average Rating</th>
                <th>Your Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMovies.map((movie) => (
                <tr key={movie.movieId}>
                  <td>
                    <img
                      src={movie.cover}
                      alt={movie.title}
                      className="book-cover"
                    />
                  </td>
                  <td>{movie.title}</td>
                  <td>{movie.director}</td>
                  <td>{movie.avgRating}</td>
                  <td>
                    <StarRating
                      mediaId={movie.movieId}
                      onRatingChange={handleUserRatingChange}
                      initialRating={movie.userRating}
                    />
                  </td>
                  <td>
                    <button
                      className="details-books-button"
                      onClick={() => handleMovieClick(movie.movieId)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteMovie(movie)}
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
        recommendedMedia={recommendedMovies}
        mediaType="movie"
        handleAddMedia={handleAddMovieFromSearch}
      />

      {selectedMovieId && (
        <MediaDetails
          mediaId={selectedMovieId}
          onClose={handleCloseDetails}
          mediaType="movie"
        />
      )}
    </>
  );
};

export default Movies;
