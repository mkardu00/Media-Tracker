import "./App.css";

import NavBar from "./NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Books from "./Books";
import VideoGames from "./VideoGames";
import Movies from "./Movies";
import TVShows from "./TVShows";
import HomePage from "./HomePage";
import PrivateRoute from "./PrivateRoute";
import "./NavBar.css";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
            path="/tv-shows"
            element={
              <PrivateRoute>
                <TVShows />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
