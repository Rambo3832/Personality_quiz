// src/components/Homepage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import "./Homepage.css";

const Homepage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slideshow data
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      heading: "Discover Yourself with AI-Powered Personality Insights.",
      subheading: "Take the Quiz. Understand Your Mind. Unlock Your Potential.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      heading: "Discover Yourself with AI-Powered Personality Insights.",
      subheading: "Take the Quiz. Understand Your Mind. Unlock Your Potential.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1553481187-2a6e5e5f8f9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      heading: "Discover Yourself with AI-Powered Personality Insights.",
      subheading: "Take the Quiz. Understand Your Mind. Unlock Your Potential.",
    },
  ];

  // Slideshow logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleStartQuiz = () => {
    if (user) {
      navigate("/quiz-selection");
    } else {
      setShowModal(true);
      setActiveTab("login");
    }
  };

  const closeModal = (userData) => {
    setShowModal(false);
    setActiveTab("login");
    if (userData) {
      setUser(userData); // Update user state in App.js
      navigate("/quiz-selection"); // Navigate after state update
    }
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

  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="slideshow">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-content">
                <h1>{slide.heading}</h1>
                <p>{slide.subheading}</p>
                <button className="start-quiz-btn" onClick={handleStartQuiz}>
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="slideshow-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Tests Taken Section */}
      <div className="tests-taken-section">
        <h2>565,900 TESTS TAKEN IN THE LAST 30 DAYS</h2>
        <p>
          This free personality test gives you accurate scores for the Big Five
          personality traits. See exactly how you score for Openness,
          Conscientiousness, Extraversion, Agreeableness, and Neuroticism with
          this scientific personality assessment.
        </p>
      </div>

      {/* Feature Highlights Section */}
      <div className="feature-highlights">
        <div className="highlight-card">
          <span className="highlight-icon">🔍</span>
          <h3>Personality Analysis</h3>
          <p>Get accurate insights into your personality traits</p>
        </div>
        <div className="highlight-card">
          <span className="highlight-icon">🎯</span>
          <h3>Personalized Tips</h3>
          <p>Receive advice tailored to your unique profile</p>
        </div>
        <div className="highlight-card">
          <span className="highlight-icon">⚡</span>
          <h3>Quick & Interactive</h3>
          <p>Enjoy a fast and engaging quiz experience</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2>Ready to Unlock Your Personality?</h2>
        <button className="cta-btn" onClick={handleStartQuiz}>
          Get Started
        </button>
      </div>

      {/* Footer Section with Social Media Links */}
      <footer className="footer">
        <h3 className="footer-text">Want to Explore More? Connect With Us!</h3>
        <div className="social-links">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-icon">🖇️</span> LinkedIn
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-icon">📸</span> Instagram
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-icon">📘</span> Facebook
          </a>
        </div>
      </footer>

      {/* Login/Signup Modal */}
      {showModal && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              ×
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
                  onLoginSuccess={(user) => {
                    closeModal(user);
                  }}
                />
              </>
            ) : (
              <>
                <h2>Sign Up to Start Quiz</h2>
                <Signup
                  onSignupSuccess={(user) => {
                    closeModal(user);
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
