import React, { useState, useEffect } from "react";
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
  const [signupSuccessful, setSignupSuccessful] = useState(false);
  const [signeinSuccessful, setSigneinSuccessful] = useState(false);
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const openSignInModal = () => setSignInOpen(true);
  const closeSignInModal = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setError("");
    setSignInOpen(false);
  };

  const openSignUpModal = () => setSignUpOpen(true);
  const closeSignUpModal = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setError("");
    setSignUpOpen(false);
  };

  const currentUser = localStorage.getItem("currentUser");

  const navigate = useNavigate();

  function isPasswordValid() {
    let isValid = true;
    if (password.length < 9) {
      isValid = false;
      setError("Password is to short");
    } else if (password.length > 20) {
      isValid = false;
      setError("Password is to long");
    } else if (password.search(/\d/) === -1) {
      isValid = false;
      setError("Password must contain at least one number");
    } else if (password.search(/[A-Z]/) === -1) {
      isValid = false;
      setError("Password must contain at least one uppercase letter");
    } else if (password.search(/[a-z]/) === -1) {
      isValid = false;
      setError("Password must contain at least one lower letter");
    } else if (password.search(/[!@#$%^&*]/) === -1) {
      isValid = false;
      setError(
        "Password must contain at least one special characters like !@#$%^&*"
      );
    }
    return isValid;
  }

  const handleSignIn = (e) => {
    console.log("handle signe in");
    e.preventDefault();
    setError("");
    if (!email || !password) {
      return setError("Please enter email and password");
    } else {
      setError("");
      let userData = localStorage.getItem("userData");

      if (!userData) {
        return setError("User does not exist");
      } else {
        let userDataObj = JSON.parse(userData);
        if (!userData || !userDataObj[email]) {
          return setError("Incorrect email");
        } else if (userDataObj[email]["password"] !== password) {
          return setError("Incorrect password");
        }
      }
      localStorage.setItem("currentUser", email);
      setSigneinSuccessful(true);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password || !passwordConfirm) {
      return setError("Please enter all required fields");
    } else if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }
    if (!isPasswordValid()) {
      return;
    }

    setError("");
    let userData = localStorage.getItem("userData");

    if (!userData) {
      userData = {};
      userData[email] = {
        name: name,
        password: password,
        books: {},
        movies: {},
        tvShows: {},
        videoGames: {},
      };
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      let userDataObj = JSON.parse(userData);
      if (userDataObj[email]) {
        return setError("Email already in use");
      }
      userDataObj[email] = { password: password, contacts: {} };
      localStorage.setItem("userData", JSON.stringify(userDataObj));
    }
    setSignupSuccessful(true);
    localStorage.setItem("currentUser", email);
  };

  return (
    <div className="home-container">
      {useEffect(() => {
        currentUser && navigate("/books");
      })}
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
        {error && <p>{error}</p>}
        <form onSubmit={handleSignIn}>
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
          <div className="modal-button-container">
            <button type="submit">Submit</button>
            <button type="close" onClick={closeSignInModal}>
              Close
            </button>
            {useEffect(() => {
              signeinSuccessful && navigate("/books");
            })}
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
          {error && <p>{error}</p>}
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
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Password confirm: </label>
            <input
              type="password"
              value={passwordConfirm}
              placeholder="Enter password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="modal-button-container">
            <button type="submit">Submit</button>
            <button type="close" onClick={closeSignUpModal}>
              Close
            </button>
            {useEffect(() => {
              signupSuccessful && navigate("/books");
            })}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default HomePage;
