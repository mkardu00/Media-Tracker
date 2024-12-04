import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import profileImg from "./assets/profile.png";
import logoImg from "./assets/logo.png";
import { FaBook, FaGamepad, FaFilm } from "react-icons/fa";
import "./NavBar.css";

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
  const [user, setUser] = useState(null);
  const [showSearchModal, setShowSearchModal] = useState(false); // State za modal
  const token = localStorage.getItem("token");

  // Funkcija za dohvat podataka o korisniku
  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleCloseModal = () => {
    setSearchQuery("");
    setShowSearchModal(false);
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
            <button
              onClick={() => {
                handleSearch();
                setShowSearchModal(true);
              }}
            >
              Search
            </button>
            <button onClick={handleClearSearchResults}>Clear</button>
          </div>

          {user && (
            <div className="nav-right">
              <div className="user-info">
                <Link
                  to="/profile"
                  className={location.pathname === "/profile" ? "active" : ""}
                >
                  <img
                    src={user.profileImage || profileImg}
                    alt="User Avatar"
                    className="user-avatar"
                  />
                  <span className="greeting">{user.name.toUpperCase()}</span>
                </Link>
              </div>
              <button onClick={handleSignOut} className="sign-out-button">
                Sign Out
              </button>
            </div>
          )}
        </nav>
      )}

      {showSearchModal && (
        <div className="overlay" onClick={handleCloseModal}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Search Results</h2>
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
                      View
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
