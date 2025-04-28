import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuizSelection.css";

// Import local images
import officeImage from "./assets/office.jpg";
import familyImage from "./assets/family.jpeg";
import friendshipImage from "./assets/friendship.jpg";
import romanticImage from "./assets/love.jpg";

const quizTypes = [
  {
    id: "office",
    name: "Office Personality",
    image: officeImage,
  },
  {
    id: "family",
    name: "Family Personality",
    image: familyImage,
  },
  {
    id: "friendship",
    name: "Friendship/Social Personality",
    image: friendshipImage,
  },
  {
    id: "romantic",
    name: "Romantic Personality",
    image: romanticImage,
  },
];

const QuizSelection = () => {
  const navigate = useNavigate();

  const handleQuizSelect = (quizType) => {
    navigate("/quiz", { state: { quizType } });
  };

  return (
    <div className="quiz-selection-container">
      <h2 className="quiz-title">Discover Your Personality</h2>
      <div className="quiz-grid">
        {quizTypes.map((quiz) => (
          <button
            key={quiz.id}
            className="quiz-card"
            onClick={() => handleQuizSelect(quiz.id)}
          >
            <div className="quiz-image-container">
              <img src={quiz.image} alt={quiz.name} className="quiz-image" />
            </div>
            <span className="quiz-name">{quiz.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizSelection;
