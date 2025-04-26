import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Quiz.css";

const quizQuestions = {
  office: [
    {
      question: "How do you approach a new project at work?",
      options: [
        "Take charge and delegate tasks",
        "Plan strategically with long-term goals",
        "Collaborate closely with the team",
        "Analyze data to ensure accuracy",
      ],
    },
    {
      question: "What's your role in team meetings?",
      options: [
        "Lead the discussion",
        "Share innovative ideas",
        "Support and build on others' ideas",
        "Provide detailed insights",
      ],
    },
    {
      question: "How do you handle tight deadlines?",
      options: [
        "Organize and prioritize tasks",
        "Inspire the team with a vision",
        "Work closely with colleagues",
        "Focus on critical details",
      ],
    },
  ],
  family: [
    {
      question: "How do you contribute to family gatherings?",
      options: [
        "Plan and organize the event",
        "Bring creative ideas for activities",
        "Ensure everyone feels included",
        "Handle practical details",
      ],
    },
    {
      question: "How do you resolve family disagreements?",
      options: [
        "Mediate and find common ground",
        "Propose new perspectives",
        "Listen and empathize",
        "Analyze the root cause",
      ],
    },
    {
      question: "What's your role in family decisions?",
      options: [
        "Guide the family forward",
        "Think outside the box",
        "Foster harmony",
        "Provide logical input",
      ],
    },
  ],
  friendship: [
    {
      question: "How do you spend time with friends?",
      options: [
        "Organize group activities",
        "Suggest new experiences",
        "Enjoy group dynamics",
        "Focus on deep conversations",
      ],
    },
    {
      question: "How do you support a friend in need?",
      options: [
        "Offer clear advice",
        "Inspire with optimism",
        "Be there emotionally",
        "Analyze their situation",
      ],
    },
    {
      question: "What's your role in your friend group?",
      options: [
        "The planner",
        "The idea generator",
        "The connector",
        "The thinker",
      ],
    },
  ],
  romantic: [
    {
      question: "How do you plan a date?",
      options: [
        "Take the lead and organize",
        "Plan something unique",
        "Focus on shared enjoyment",
        "Consider practical details",
      ],
    },
    {
      question: "How do you express affection?",
      options: [
        "Through decisive actions",
        "With creative gestures",
        "By being supportive",
        "With thoughtful planning",
      ],
    },
    {
      question: "How do you handle disagreements with a partner?",
      options: [
        "Address issues directly",
        "Find creative solutions",
        "Prioritize emotional connection",
        "Analyze logically",
      ],
    },
  ],
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const quizType = location.state?.quizType || "office";
  const questions = quizQuestions[quizType];

  const handleAnswerClick = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/results", { state: { answers: newAnswers, quizType } });
    }
  };

  return (
    <div className="quiz-container max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">
        {questions[currentQuestion].question}
      </h2>
      <div className="options-container grid grid-cols-1 gap-2">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-300"
            onClick={() => handleAnswerClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {currentQuestion < questions.length - 1 && (
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setCurrentQuestion(currentQuestion + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Quiz;
