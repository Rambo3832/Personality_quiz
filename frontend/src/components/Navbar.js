import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Clear localStorage and reset user state (handled in App.js)
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          Personality Quiz
        </Link>
      </div>
      <div className="navbar-menu">
        {user ? (
          <>
            <Link to="/" className="nav-item">
              Home
            </Link>
            <Link to="/quiz-selection" className="nav-item">
              Take Quiz
            </Link>
            <Link to="/results" className="nav-item">
              Results
            </Link>
            <button onClick={handleLogout} className="nav-item logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Remove Login and Sign Up links entirely */}
            {/* Optionally, you can add other links here if needed */}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
