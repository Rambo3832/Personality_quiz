
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

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
        {auth.currentUser ? (
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
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;