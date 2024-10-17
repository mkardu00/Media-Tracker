import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "./BooksTabs.css";
import MediaDetails from "./MediaDetails";

const MoviesTabs = () => {
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
  const [popularMovies, setPopularMovies] = useState([]);

  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userMoviesObj = userData[currentUser]?.movies || {
      favorites: [],
      recentlyWatched: [],
      toWatch: [],
    };
    setCurrentMovies(userMoviesObj[activeTab]);
  }, [activeTab, currentUser]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=christmas`
        );
        setPopularMovies(response.data.Search || []);
      } catch (error) {
        console.error("Greška pri dohvaćanju popularnih filmova:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  const handleSearchMovies = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${API_KEY}&t=${searchQuery}`
        );
        setSearchResults(response.data || []);
      } catch (error) {
        console.error("Greška pri dohvaćanju filma:", error);
      }
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

    alert(`Movie is added to your list.`);

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
      (b) => b.movieId !== movie.movieId
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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
          {searchResults.length !== 0 && (
            <li>
              🎬 {searchResults.Title}
              {console.log("ASDSAD", searchResults)}
              <div className="book-buttons">
                <button onClick={() => handleAddMovieFromSearch(searchResults)}>
                  Add to {activeTab}
                </button>
                <button onClick={() => handleMovieClick(searchResults.imdbID)}>
                  View Details
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>
      <div className="carousel-container">
        <Slider {...settings}>
          {popularMovies.map((movie) => (
            <div key={movie.imdbID} className="carousel-item">
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
            </div>
          ))}
        </Slider>
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

export default MoviesTabs;
