import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  const location = useLocation();
  const isHomePage = location && location.pathname === "/";
  const currentUser = localStorage.getItem("currentUser");

  return (
    <div>
      {!isHomePage && (
        <nav>
          <ul>
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
            </li>
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
              <li>
                <Link>Hello, {currentUser}</Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default NavBar;
