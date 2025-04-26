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
    {
      question: "How do you respond to a workplace conflict?",
      options: [
        "Take the lead to mediate",
        "Propose creative solutions",
        "Listen to all parties involved",
        "Analyze the root cause",
      ],
    },
    {
      question: "What's your approach to giving feedback?",
      options: [
        "Direct and actionable",
        "Encouraging and visionary",
        "Supportive and empathetic",
        "Detailed and constructive",
      ],
    },
    {
      question: "How do you contribute to team goals?",
      options: [
        "Set clear objectives",
        "Bring new perspectives",
        "Foster team unity",
        "Ensure accuracy in execution",
      ],
    },
    {
      question: "How do you stay motivated at work?",
      options: [
        "By leading projects",
        "By exploring new ideas",
        "By collaborating with others",
        "By mastering details",
      ],
    },
    {
      question: "How do you handle a project setback?",
      options: [
        "Reorganize and push forward",
        "Rethink the approach creatively",
        "Rally the team for support",
        "Investigate the issue thoroughly",
      ],
    },
    {
      question: "What's your preferred way to learn new skills?",
      options: [
        "Lead by example",
        "Experiment with new methods",
        "Learn from colleagues",
        "Study resources in depth",
      ],
    },
    {
      question: "How do you celebrate a team success?",
      options: [
        "Plan a recognition event",
        "Share a bold vision for the future",
        "Celebrate with the team",
        "Document the achievement",
      ],
    },
  ],
  family: [
    {
      question: "How do you contribute to family gatherings?",
      options: [
        "Create a warm, welcoming atmosphere",
        "Ensure everyone is safe and cared for",
        "Bring a fun, unconventional twist",
        "Plan independently to suit your needs",
      ],
    },
    {
      question: "How do you resolve family disagreements?",
      options: [
        "Listen empathetically to find harmony",
        "Stand firm to protect family values",
        "Challenge norms to find a new way",
        "Analyze the issue on your own",
      ],
    },
    {
      question: "What's your role in family decisions?",
      options: [
        "Nurture and support consensus",
        "Safeguard the family’s well-being",
        "Push for bold, unique choices",
        "Make decisions independently",
      ],
    },
    {
      question: "How do you spend quality time with family?",
      options: [
        "Share heartfelt moments together",
        "Plan secure, stable activities",
        "Try spontaneous adventures",
        "Enjoy your own space",
      ],
    },
    {
      question: "How do you support a family member in need?",
      options: [
        "Offer emotional care and comfort",
        "Provide strong, protective guidance",
        "Encourage them to break free",
        "Give advice from a distance",
      ],
    },
    {
      question: "How do you handle family traditions?",
      options: [
        "Uphold them with love",
        "Ensure they’re meaningful and safe",
        "Reinvet them with creativity",
        "Participate minimally",
      ],
    },
    {
      question: "How do you approach family budgeting?",
      options: [
        "Prioritize family’s comfort",
        "Focus on financial security",
        "Explore unconventional savings",
        "Manage your own finances",
      ],
    },
    {
      question: "How do you celebrate family milestones?",
      options: [
        "Create heartfelt celebrations",
        "Ensure a secure, joyful event",
        "Make it uniquely memorable",
        "Celebrate on your own terms",
      ],
    },
    {
      question: "How do you teach younger family members?",
      options: [
        "Guide with kindness and patience",
        "Protect and mentor firmly",
        "Inspire with bold ideas",
        "Encourage self-learning",
      ],
    },
    {
      question: "How do you handle family stress?",
      options: [
        "Comfort and soothe everyone",
        "Take charge to stabilize",
        "Break tension with humor",
        "Retreat to process alone",
      ],
    },
  ],
  friendship: [
    {
      question: "How do you spend time with friends?",
      options: [
        "Stay loyal and dependable",
        "Bring high energy to the group",
        "Offer thoughtful advice",
        "Enjoy your own company",
      ],
    },
    {
      question: "How do you support a friend in need?",
      options: [
        "Be a steadfast listener",
        "Cheer them up with fun",
        "Provide wise, calm guidance",
        "Respect their space",
      ],
    },
    {
      question: "What's your role in your friend group?",
      options: [
        "The reliable anchor",
        "The life of the party",
        "The trusted advisor",
        "The independent spirit",
      ],
    },
    {
      question: "How do you plan a group outing?",
      options: [
        "Ensure everyone’s included",
        "Make it a lively event",
        "Choose meaningful activities",
        "Go with your own plan",
      ],
    },
    {
      question: "How do you handle a disagreement with a friend?",
      options: [
        "Stay loyal and reconcile",
        "Lighten the mood with fun",
        "Offer balanced perspectives",
        "Keep your distance",
      ],
    },
    {
      question: "How do you celebrate a friend’s success?",
      options: [
        "Show unwavering support",
        "Throw a festive celebration",
        "Give thoughtful praise",
        "Congratulate quietly",
      ],
    },
    {
      question: "How do you maintain friendships over time?",
      options: [
        "Check in consistently",
        "Keep things exciting",
        "Share meaningful talks",
        "Connect when it suits you",
      ],
    },
    {
      question: "How do you introduce new friends to the group?",
      options: [
        "Make everyone feel at ease",
        "Create a fun vibe",
        "Facilitate deep connections",
        "Let them integrate alone",
      ],
    },
    {
      question: "How do you share interests with friends?",
      options: [
        "Bond over shared loyalty",
        "Explore with enthusiasm",
        "Discuss in depth",
        "Pursue your interests solo",
      ],
    },
    {
      question: "How do you handle a friend’s absence?",
      options: [
        "Stay loyal and reach out",
        "Keep the group lively",
        "Reflect on their needs",
        "Focus on your own path",
      ],
    },
  ],
  romantic: [
    {
      question: "How do you plan a date?",
      options: [
        "Craft a deeply emotional experience",
        "Choose something uniquely personal",
        "Make it fiery and exciting",
        "Plan with practicality in mind",
      ],
    },
    {
      question: "How do you express affection?",
      options: [
        "With heartfelt gestures",
        "Through personal freedom",
        "With intense devotion",
        "With thoughtful reasoning",
      ],
    },
    {
      question: "How do you handle disagreements with a partner?",
      options: [
        "Seek emotional understanding",
        "Maintain your independence",
        "Confront with passion",
        "Resolve with logic",
      ],
    },
    {
      question: "How do you celebrate anniversaries?",
      options: [
        "Create a romantic moment",
        "Celebrate your unique bond",
        "Make it vibrant and bold",
        "Plan a balanced event",
      ],
    },
    {
      question: "How do you support your partner’s goals?",
      options: [
        "Encourage with deep care",
        "Respect their autonomy",
        "Fuel their drive passionately",
        "Offer practical advice",
      ],
    },
    {
      question: "How do you spend quality time together?",
      options: [
        "Share intimate moments",
        "Enjoy separate interests",
        "Embrace thrilling activities",
        "Focus on mutual goals",
      ],
    },
    {
      question: "How do you handle stress in the relationship?",
      options: [
        "Comfort with empathy",
        "Give space for freedom",
        "Face it with intensity",
        "Analyze calmly",
      ],
    },
    {
      question: "How do you plan for the future together?",
      options: [
        "Dream of emotional connection",
        "Value individual growth",
        "Pursue shared passions",
        "Plan logically",
      ],
    },
    {
      question: "How do you surprise your partner?",
      options: [
        "With a loving gesture",
        "With a personal touch",
        "With bold excitement",
        "With careful thought",
      ],
    },
    {
      question: "How do you grow together as a couple?",
      options: [
        "Deepen emotional bonds",
        "Foster personal freedom",
        "Ignite shared enthusiasm",
        "Build a stable foundation",
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
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option; // Update or set the answer for the current question
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/results", { state: { answers: newAnswers, quizType } });
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
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
      <div className="navigation-buttons flex justify-between mt-4">
        {currentQuestion > 0 && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlePreviousClick}
          >
            Previous
          </button>
        )}
        {currentQuestion < questions.length - 1 && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
