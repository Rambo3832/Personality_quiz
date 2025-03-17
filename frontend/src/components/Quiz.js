import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

const questions = [
  {
    question: "You're waiting for a lecture to start. What do you do?",
    options: [
      "Chat with the person sitting next to me",
      "Do something on my phone",
      "Observe the audience",
    ],
  },
  {
    question: "How do you feel about having roommates?",
    options: [
      "It's nice to have someone there when I get home",
      "I much prefer living alone",
      "I don't mind, as long as they're clean and responsible",
    ],
  },
  {
    question: "How do you prepare for a trip?",
    options: [
      "I read up and make a detailed schedule",
      "I may read a little, but generally I'll wing it",
      "I find contacts I can hang out with wherever I go",
      "I check out their local art to get a feel of the culture",
    ],
  },
  {
    question: "Your work space is usually",
    options: ["Very organized", "A total mess", "Quiet and comfortable"],
  },
  {
    question: "Which of the following would you rather be?",
    options: [
      "An interior designer",
      "A therapist",
      "A financial consultant",
      "A researcher",
    ],
  },
  {
    question: "Which of the following interests you more?",
    options: ["Making and doing", "Researching and planning", "Meeting people"],
  },
  {
    question: "How do you usually make decisions?",
    options: [
      "I consider all options and make the sensible choice",
      "I go with my gut",
      "I ask for advice and consult with friends",
    ],
  },
  {
    question: "What are you more likely to do?",
    options: ["What I think is right", "What society thinks is right"],
  },
  {
    question:
      "You're at a social event and you don't know anyone, how do you feel?",
    options: [
      "Excited to meet new people",
      "When can I go home?",
      "Happy to observe the crowd, and listen to the room",
    ],
  },
  {
    question: "You get a challenging task at work, how do you tackle it?",
    options: [
      "I gather all the information before I begin",
      "I get started and learn as I go",
      "I consult with my colleagues to get some ideas",
    ],
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const handleAnswerClick = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/results", { state: { answers: newAnswers } });
    }
  };

  return (
    <div className="quiz-container">
      <h2>{questions[currentQuestion].question}</h2>
      <div className="options-container">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className="option-btn"
            onClick={() => handleAnswerClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {currentQuestion < questions.length - 1 && (
        <button
          className="next-btn"
          onClick={() => setCurrentQuestion(currentQuestion + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Quiz;