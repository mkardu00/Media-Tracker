import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profileImg from "./assets/profile.png";
import "./NavBar.css";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location && location.pathname === "/";
  const currentUser = localStorage.getItem("currentUser");

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div>
      {!isHomePage && (
        <nav>
          <ul>
            <li></li>
            <li>
              <Link
                to="/books"
                className={location.pathname === "/books" ? "active" : ""}
              >
                Books
              </Link>
            </li>
            <li>
              <Link
                to="/video-games"
                className={location.pathname === "/video-games" ? "active" : ""}
              >
                Video Games
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className={location.pathname === "/movies" ? "active" : ""}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/tv-shows"
                className={location.pathname === "/tv-shows" ? "active" : ""}
              >
                TV Shows
              </Link>
            </li>

            {currentUser && (
              <>
                <li className="user-info">
                  <img
                    src={profileImg}
                    alt="User Avatar"
                    className="user-avatar"
                  />
                  <span className="greeting">Hello, {currentUser}</span>
                </li>
                <li>
                  <button onClick={handleSignOut} className="sign-out-button">
                    Sign Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default NavBar;
