import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./Results.css";

const personalityDescriptions = {
  introvert:
    "Introverts are thoughtful and prefer deep connections over small talk.",
  extrovert:
    "Extroverts are energetic, outgoing, and thrive in social settings.",
  thinker: "Thinkers are analytical and enjoy solving complex problems.",
  feeler: "Feelers are empathetic and value emotions in decision-making.",
};

const personalityTypes = {
  introvert: [
    "Observe the audience",
    "I much prefer living alone",
    "Very organized",
    "I consider all options and make the sensible choice",
    "What I think is right",
  ],
  extrovert: [
    "Chat with the person sitting next to me",
    "Excited to meet new people",
    "Happy to observe the crowd, and listen to the room",
    "Meeting people",
    "I ask for advice and consult with friends",
  ],
  thinker: [
    "I gather all the information before I begin",
    "I consider all options and make the sensible choice",
    "Researching and planning",
  ],
  feeler: [
    "I go with my gut",
    "I ask for advice and consult with friends",
    "Making and doing",
  ],
};

const determinePersonality = (answers) => {
  let scores = { introvert: 0, extrovert: 0, thinker: 0, feeler: 0 };

  answers.forEach((answer) => {
    Object.keys(personalityTypes).forEach((type) => {
      if (personalityTypes[type].includes(answer)) {
        scores[type] += 1;
      }
    });
  });

  let result = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || [];
  const personality = answers.length > 0 ? determinePersonality(answers) : null;

  const [attempts, setAttempts] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
      let storedResults =
        JSON.parse(localStorage.getItem(`quizAttempts_${currentUser.uid}`)) ||
        [];

      if (
        personality &&
        (!storedResults.length ||
          storedResults[storedResults.length - 1] !== personality)
      ) {
        storedResults.push(personality);
        localStorage.setItem(
          `quizAttempts_${currentUser.uid}`,
          JSON.stringify(storedResults)
        );
      }

      setAttempts(storedResults);
    }
  }, [personality]);

  return (
    <div className="results-container">
      <h2>Personality Type Meanings</h2>
      <ul>
        {Object.entries(personalityDescriptions).map(([type, desc]) => (
          <li key={type}>
            <strong>{type.charAt(0).toUpperCase() + type.slice(1)}:</strong>{" "}
            {desc}
          </li>
        ))}
      </ul>
      <hr />
      <h2>Your Quiz Result</h2>
      {userId && attempts.length === 0 ? (
        <p>No quiz attempts yet. Please take the quiz first!</p>
      ) : (
        attempts.map((result, index) => (
          <p key={index}>
            According to your {index + 1} attempt, you are{" "}
            <strong>{result}</strong>.
          </p>
        ))
      )}
      <button className="back-btn" onClick={() => navigate("/")}>
        Go Back to Home
      </button>
    </div>
  );
};

export default Results;
