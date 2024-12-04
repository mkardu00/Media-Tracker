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

  const navigate = useNavigate();

  const isPasswordValid = () => {
    let isValid = true;
    if (password.length < 9) {
      isValid = false;
      setError("Password is too short");
    } else if (password.length > 20) {
      isValid = false;
      setError("Password is too long");
    } else if (password.search(/\d/) === -1) {
      isValid = false;
      setError("Password must contain at least one number");
    } else if (password.search(/[A-Z]/) === -1) {
      isValid = false;
      setError("Password must contain at least one uppercase letter");
    } else if (password.search(/[a-z]/) === -1) {
      isValid = false;
      setError("Password must contain at least one lowercase letter");
    } else if (password.search(/[!@#$%^&*]/) === -1) {
      isValid = false;
      setError(
        "Password must contain at least one special character like !@#$%^&*"
      );
    }
    return isValid;
  };

  const signupUser = async (name, email, password) => {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  };

  const signinUser = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  };

  const handleSignUp = async (e) => {
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

    try {
      await signupUser(name, email, password);
      setSignupSuccessful(true);
      navigate("/books");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Please enter email and password");
    }

    try {
      const data = await signinUser(email, password);
      localStorage.setItem("token", data.token);
      setSigneinSuccessful(true);
      navigate("/books");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/books");
    }
  }, []);
  return (
    <div className="home-container">
      <div className="content " style={{ color: "white" }}>
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
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        {error && <div>{error}</div>}
        <button onClick={closeSignInModal}>Close</button>
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
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        {error && <div>{error}</div>}
        <button onClick={closeSignUpModal}>Close</button>
      </Modal>
    </div>
  );
};

export default HomePage;
