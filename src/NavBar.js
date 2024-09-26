import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Books from "./Books";
import VideoGames from "./VideoGames";
import Movies from "./Movies";
import TVShows from "./TVShows";
import HomePage from "./HomePage";
import "./NavBar.css";

const NavBar = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
            <li>
              <Link to="/video-games">Video Games</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/tv-shows">TV Shows</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<Books />} />
          <Route path="/video-games" element={<VideoGames />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv-shows" element={<TVShows />} />
        </Routes>
      </div>
    </Router>
  );
};

export default NavBar;
