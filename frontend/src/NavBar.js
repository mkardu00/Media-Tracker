import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profileImg from "./assets/profile.png";
import logoImg from "./assets/logo.png";
import { FaBook, FaGamepad, FaFilm, FaUser } from "react-icons/fa";
import "./NavBar.css";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location && location.pathname === "/";
  const currentUser = localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem("userData")) || {};
  console.log("User DAta", userData[currentUser].name);

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

          {currentUser && (
            <div className="nav-right">
              <div className="user-info">
                <Link
                  to="/profile"
                  className={location.pathname === "/profile" ? "active" : ""}
                >
                  <FaUser className="user-avatar" />
                  <span className="greeting">
                    {userData[currentUser].name.toUpperCase()}
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
