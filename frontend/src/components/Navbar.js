import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          Personality Quiz
        </Link>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Link to="/quiz-selection" className="nav-item">
          Take Quiz
        </Link>
        <Link to="/results" className="nav-item">
          Results
        </Link>
        {auth.currentUser ? (
          <button onClick={handleLogout} className="nav-item logout-btn">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="nav-item">
              Login
            </Link>
            <Link to="/signup" className="nav-item">
              Sign Up
            </Link>
            <button
              onClick={handleGoogleSignIn}
              className="nav-item google-btn"
            >
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
