import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "../firebase"; // Import googleProvider
import { signInWithPopup } from "firebase/auth";
import Login from "./Login";
import Signup from "./Signup"; // Import Signup component
import "./Homepage.css";

const Homepage = ({ user }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [googleError, setGoogleError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleStartQuiz = () => {
    if (user) {
      navigate("/quiz-selection");
    } else {
      setShowModal(true);
      setActiveTab("login"); // Default to login tab
      setGoogleError("");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setGoogleError("");
    setActiveTab("login");
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showModal) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showModal]);

  // Handle click outside modal
  const handleModalClick = (e) => {
    if (e.target.className.includes("modal")) {
      closeModal();
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setGoogleError("");
    try {
      await signInWithPopup(auth, googleProvider);
      closeModal();
      navigate("/quiz-selection");
    } catch (error) {
      setGoogleError(error.message || "Failed to sign in with Google");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="homepage">
      <div className="hero-section">
        <h1>Discover Your Personality Type</h1>
        <p>
          Take our comprehensive personality quiz and learn more about yourself
        </p>
        <button className="start-quiz-btn" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      </div>
      <div className="features-section">
        <div className="feature-card">
          <h3>Quick & Easy</h3>
          <p>Complete the quiz in under 10 minutes</p>
        </div>
        <div className="feature-card">
          <h3>Accurate Results</h3>
          <p>Get detailed insights about your personality</p>
        </div>
        <div className="feature-card">
          <h3>Free Analysis</h3>
          <p>Receive your personality profile instantly</p>
        </div>
      </div>

      {/* Login/Signup Modal */}
      {showModal && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <div className="modal-tabs">
              <button
                className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                className={`tab-btn ${activeTab === "signup" ? "active" : ""}`}
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
            </div>
            {activeTab === "login" ? (
              <>
                <h2>Login to Start Quiz</h2>
                <Login
                  onLoginSuccess={() => {
                    closeModal();
                    navigate("/quiz-selection");
                  }}
                />
              </>
            ) : (
              <>
                <h2>Sign Up to Start Quiz</h2>
                <Signup
                  onSignupSuccess={() => {
                    closeModal();
                    navigate("/quiz-selection");
                  }}
                />
              </>
            )}
            <button
              onClick={handleGoogleSignIn}
              className="google-btn"
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? "Loading..." : "Sign in with Google"}
            </button>
            {googleError && <p className="error-message">{googleError}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;