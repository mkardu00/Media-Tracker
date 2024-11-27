import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profileImg from "./assets/profile.png";
import logoImg from "./assets/logo.png";
import { FaBook, FaGamepad, FaFilm, FaUser } from "react-icons/fa";
import "./NavBar.css";

import { FaEye, FaTrashAlt } from "react-icons/fa";

const NavBar = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleClearSearchResults,
  searchResults,
  handleAddMediaFromSearch,
  handleMediaClick,
  activeTab,
  handleKeyPress,
  mediaType,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location && location.pathname === "/";
  const currentUser = localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem("userData")) || {};

  const profileImage = userData[currentUser].profileImage;

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div>
      {!isHomePage && (
        <nav>
          <div className="nav-left">
            <img
              src={logoImg}
              alt="Logo"
              className="logo-img"
              onClick={() => navigate("/userHome")}
              style={{ cursor: "pointer" }}
            />
            <ul>
              <li>
                <Link
                  to="/books"
                  className={location.pathname === "/books" ? "active" : ""}
                >
                  <FaBook className="nav-icon" /> Books
                </Link>
              </li>
              <li>
                <Link
                  to="/video-games"
                  className={
                    location.pathname === "/video-games" ? "active" : ""
                  }
                >
                  <FaGamepad className="nav-icon" /> Video Games
                </Link>
              </li>
              <li>
                <Link
                  to="/movies"
                  className={location.pathname === "/movies" ? "active" : ""}
                >
                  <FaFilm className="nav-icon" /> Movies & TV Shows
                </Link>
              </li>
            </ul>
          </div>
          <div className="book-search">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleKeyPress(e)}
              placeholder={`Search for a ${mediaType}...`}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleClearSearchResults}>Clear</button>
            <ul>
              {searchResults?.map((item, index) => (
                <li key={index}>
                  {mediaType === "book"
                    ? "📚 "
                    : mediaType === "movie"
                    ? "🎬 "
                    : mediaType === "game"
                    ? "🎮 "
                    : ""}
                  {item.volumeInfo?.title || item.Title || item.name}

                  <div className="book-buttons">
                    <button onClick={() => handleAddMediaFromSearch(item)}>
                      Add to {activeTab}
                    </button>
                    <button
                      onClick={() =>
                        handleMediaClick(item.id || item.imdbID || item.gameId)
                      }
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() =>
                        handleMediaClick(item.id || item.imdbID || item.gameId)
                      }
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {currentUser && (
            <div className="nav-right">
              <div className="user-info">
                <Link
                  to="/profile"
                  className={location.pathname === "/profile" ? "active" : ""}
                >
                  <img
                    src={profileImage || profileImg}
                    alt="User Avatar"
                    className="user-avatar"
                  />
                  <span className="greeting">
                    {userData[currentUser]?.name?.toUpperCase() || "User"}
                  </span>
                </Link>
              </div>
              <button onClick={handleSignOut} className="sign-out-button">
                Sign Out
              </button>
            </div>
          )}
        </nav>
      )}
    </div>
  );
};

export default NavBar;
