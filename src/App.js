import "./App.css";

import NavBar from "./NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Books from "./Books";
import VideoGames from "./VideoGames";
import Movies from "./Movies";
import TVShows from "./TVShows";
import HomePage from "./HomePage";
import "./NavBar.css";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<Books />} />
          <Route path="/video-games" element={<VideoGames />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv-shows" element={<TVShows />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
