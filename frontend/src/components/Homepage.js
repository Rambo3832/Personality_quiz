import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <div className="hero-section">
        <h1>Discover Your Personality Type</h1>
        <p>Take our comprehensive personality quiz and learn more about yourself</p>
        <button 
          className="start-quiz-btn"
          onClick={() => navigate('/quiz')}
        >
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
    </div>
  );
};

export default Homepage;
