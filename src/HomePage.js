import React, { useState } from "react";
import "./HomePage.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const HomePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const openSignInModal = () => setSignInOpen(true);
  const closeSignInModal = () => setSignInOpen(false);

  const openSignUpModal = () => setSignUpOpen(true);
  const closeSignUpModal = () => setSignUpOpen(false);

  const currentUser = localStorage.getItem("currentUser");

  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    closeSignInModal();
    navigate("/books");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");

    alert("Podaci su uspješno spremljeni u local storageu!");
    localStorage.setItem("currentUser", name);
    closeSignUpModal();
    navigate("/books");
  };

  return (
    <div className="home-container">
      <div className="content " style={{ color: "white" }}>
        <h1>Welcome to Media Tracker</h1>
        <p color>
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
            width: "600px",
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
          <div className="modal-button-container">
            <button type="submit">Submit</button>
            <button type="close" onClick={closeSignInModal}>
              Close
            </button>
          </div>
        </form>
      </Modal>

      {/* Sign Up Modal */}
      <Modal
        isOpen={isSignUpOpen}
        onRequestClose={closeSignUpModal}
        contentLabel="Sign Up"
        style={{
          content: {
            width: "600px",
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
            <input
              type="text"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Password confirm: </label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="modal-button-container">
            <button type="submit">Submit</button>
            <button type="close" onClick={closeSignUpModal}>
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default HomePage;
