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
    name: "Work Personality",
    image: officeImage,
  },
  {
    id: "family",
    name: "Family Life",
    image: familyImage,
  },
  {
    id: "friendship",
    name: "Social Personality",
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
      <div className="quiz-info">
        <p className="quiz-statistic">
          565,900 TESTS TAKEN IN THE LAST 30 DAYS
        </p>
        <p className="quiz-description">
          This free personality test reveals who you really are. Discover the 4
          personalities created by Jhanvi & Ansh, test your personality type,
          and find your strengths.
        </p>
      </div>
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
      <div className="quiz-footer">
        <p className="quiz-instructions">
          To take the personality test, mark your answers based on how well each
          statement describes you. From each pair, choose the phrase that
          describes you best.
        </p>
      </div>
    </div>
  );
};

export default QuizSelection;
