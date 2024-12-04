import "./App.css";

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
