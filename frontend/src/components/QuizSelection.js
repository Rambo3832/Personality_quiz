import React from "react";
import { useNavigate } from "react-router-dom";

const quizTypes = [
  { id: "office", name: "Office Personality" },
  { id: "family", name: "Family Personality" },
  { id: "friendship", name: "Friendship/Social Personality" },
  { id: "romantic", name: "Romantic Personality" },
];

const QuizSelection = () => {
  const navigate = useNavigate();

  const handleQuizSelect = (quizType) => {
    navigate("/quiz", { state: { quizType } });
  };

  return (
    <div className="quiz-selection-container max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Choose a Personality Quiz
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {quizTypes.map((quiz) => (
          <button
            key={quiz.id}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            onClick={() => handleQuizSelect(quiz.id)}
          >
            {quiz.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizSelection;
