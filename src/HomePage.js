import React, { useState } from "react";
import "./HomePage.css"; // Stilovi za HomePage komponentu
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const HomePage = () => {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const openSignInModal = () => setSignInOpen(true);
  const closeSignInModal = () => setSignInOpen(false);

  const openSignUpModal = () => setSignUpOpen(true);
  const closeSignUpModal = () => setSignUpOpen(false);

  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault(); //kako se stranica nebi refresala
    closeSignInModal();
    navigate("/books");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    closeSignUpModal();
    navigate("/video-games");
  };

  return (
    <div className="home-container">
      <div className="content">
        <h1>Welcome to Media Tracker</h1>
        <p>
          Your journey starts here. Discover books, movies, tv shows and video
          games.
        </p>
        <div className="buttons">
          <button className="btn signup-btn" onClick={openSignUpModal}>
            Sign Up
          </button>
          <button className="btn signin-btn" onClick={openSignInModal}>
            Sign In
          </button>
        </div>
      </div>
      {/* Sign In Modal */}
      <Modal
        isOpen={isSignInOpen}
        onRequestClose={closeSignInModal}
        contentLabel="Sign In"
        style={{
          content: {
            width: "300px",
            margin: "auto",
            padding: "20px",
            textAlign: "center",
          },
        }}
      >
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div>
            <label>Email: </label>
            <input type="email" placeholder="Enter email" />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" placeholder="Enter password" />
          </div>
          <button type="submit">Submit</button>
        </form>
        <button onClick={closeSignInModal}>Close</button>
      </Modal>

      {/* Sign Up Modal */}
      <Modal
        isOpen={isSignUpOpen}
        onRequestClose={closeSignUpModal}
        contentLabel="Sign Up"
        style={{
          content: {
            width: "300px",
            margin: "auto",
            padding: "20px",
            textAlign: "center",
          },
        }}
      >
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div>
            <label>Name: </label>
            <input type="text" placeholder="Enter name" />
          </div>
          <div>
            <label>Email: </label>
            <input type="email" placeholder="Enter email" />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" placeholder="Enter password" />
          </div>
          <button type="submit">Submit</button>
        </form>
        <button onClick={closeSignUpModal}>Close</button>
      </Modal>
    </div>
  );
};

export default HomePage;
