import "./App.css";
import { useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Books from "./Books";
import VideoGames from "./VideoGames";
import Movies from "./Movies";
import HomePage from "./HomePage";
import PrivateRoute from "./PrivateRoute";
import "./NavBar.css";
import UserHome from "./UserHome";
import Profile from "./Profile";

function App() {
  let userDataInLocalStorage = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (!userDataInLocalStorage) {
      const userData = {
        "user1@gmail.com": {
          name: "John",
          password: "password123A@",
          books: {
            wantToRead: [
              "The Catcher in the Rye",
              "1984",
              "To Kill a Mockingbird",
            ],
            reading: ["Sapiens", "Atomic Habits", "Clean Code"],
            read: [
              "The Great Gatsby",
              "The Pragmatic Programmer",
              "Brave New World",
            ],
          },
          movies: {
            favorites: ["Inception", "The Matrix", "Interstellar"],
            recentlyWatched: [
              "The Shawshank Redemption",
              "The Dark Knight",
              "Pulp Fiction",
            ],
            toWatch: ["Fight Club", "The Godfather", "Forrest Gump"],
          },

          videoGames: {
            wantToPlay: [
              "The Witcher 3",
              "Red Dead Redemption 2",
              "The Last of Us",
            ],
            playing: ["Cyberpunk 2077", "Hades", "Hollow Knight"],
            played: ["Elden Ring", "Ghost of Tsushima", "Horizon Zero Dawn"],
          },
        },
        "user2@gmail.com": {
          name: "Jane",
          password: "securepassword456A@",
          books: {
            wantToRead: ["The Road", "Dune", "Fahrenheit 451"],
            reading: ["Becoming", "Educated", "Invisible Women"],
            read: ["The Hobbit", "1984", "The Handmaid’s Tale"],
          },
          movies: {
            favorites: ["La La Land", "The Grand Budapest Hotel", "Whiplash"],
            recentlyWatched: ["Parasite", "Jojo Rabbit", "1917"],
            toWatch: ["The Irishman", "Moonlight", "A Star is Born"],
          },
          videoGames: {
            wantToPlay: ["Animal Crossing", "Stardew Valley", "Celeste"],
            playing: ["Among Us", "Fall Guys", "Overwatch"],
            played: [
              "Ori and the Blind Forest",
              "Cuphead",
              "The Legend of Zelda: Breath of the Wild",
            ],
          },
        },
        "user3@gmail.com": {
          name: "Bob",
          password: "password789A@",
          books: {
            wantToRead: [
              "The Alchemist",
              "The Silent Patient",
              "The Subtle Art of Not Giving a F*ck",
            ],
            reading: ["The Lean Startup", "Zero to One", "Hooked"],
            read: [
              "How to Win Friends and Influence People",
              "Start With Why",
              "Grit",
            ],
          },
          movies: {
            favorites: [
              "The Social Network",
              "Catch Me If You Can",
              "Moneyball",
            ],
            recentlyWatched: ["Spotlight", "The Big Short", "Steve Jobs"],
            toWatch: [
              "The Wolf of Wall Street",
              "12 Angry Men",
              "Schindler’s List",
            ],
          },
          videoGames: {
            wantToPlay: ["Minecraft", "Fortnite", "League of Legends"],
            playing: ["Valorant", "Apex Legends", "Genshin Impact"],
            played: ["Doom Eternal", "Resident Evil Village", "Control"],
          },
        },
      };
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userDataInLocalStorage]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/userHome"
            element={
              <PrivateRoute>
                <UserHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <Books />
              </PrivateRoute>
            }
          />
          <Route
            path="/video-games"
            element={
              <PrivateRoute>
                <VideoGames />
              </PrivateRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <PrivateRoute>
                <Movies />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
