import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BooksTabs.css";
import MediaDetails from "./MediaDetails";
import Recommended from "./Recommended";
import StarRating from "./StarRating";

const Movies = () => {
  const currentUser = localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem("userData")) || {};

  const userMoviesObj = userData[currentUser]?.movies || {
    favorites: [],
    recentlyWatched: [],
    toWatch: [],
  };
  console.log("User data: ", userData);

  const [activeTab, setActiveTab] = useState("favorites");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [currentMovies, setCurrentMovies] = useState(userMoviesObj[activeTab]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [genreFilter, setGenreFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);

  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

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
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`
        );
        console.log("Search results ", response.data);
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

  const applyFilters = (movies) => {
    return movies.filter((movie) => {
      const genreMatch = genreFilter
        ? movie.genre?.includes(genreFilter)
        : true;
      const ratingMatch =
        ratingFilter > 0 ? movie.userRating >= ratingFilter : true;
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
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
      );
      const movieDetails = movieDetailsResponse.data;

      const movieToAdd = {
        title: movie.Title,
        movieId: movie.imdbID,
        cover: movie.Poster || "",
        avgRating: movieDetails.imdbRating || "N/A",
        userRating: 0,
        genre: movieDetails.Genre || "N/A",
        directro: movieDetails.Director,
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
    const updatedMovies = currentMovies.map((movie) =>
      movie.movieId === movieId ? { ...movie, userRating: rating } : movie
    );
    setCurrentMovies(updatedMovies);
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

      <div className="filter-container">
        <select
          onChange={(e) => setGenreFilter(e.target.value)}
          value={genreFilter}
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
        </select>
        <select
          onChange={(e) => setRatingFilter(Number(e.target.value))}
          value={ratingFilter}
        >
          <option value={0}>All Ratings</option>
          <option value={1}>1 Star & Up</option>
          <option value={2}>2 Stars & Up</option>
          <option value={3}>3 Stars & Up</option>
          <option value={4}>4 Stars & Up</option>
          <option value={5}>5 Stars</option>
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
                  <td>{movie.directro}</td>
                  <td>{movie.avgRating}</td>
                  <td>
                    <StarRating
                      movieId={movie.movieId}
                      onRatingChange={handleUserRatingChange}
                      initialRating={movie.userRating}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleMovieClick(movie.movieId)}>
                      Details
                    </button>
                    <button onClick={() => handleDeleteMovie(movie)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Recommended recommendedMedia={recommendedMovies} mediaType="movie" />

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
