import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Results.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const personalityTypes = {
  office: {
    Leader: [
      "Take charge and delegate tasks",
      "Lead the discussion",
      "Organize and prioritize tasks",
    ],
    Visionary: [
      "Plan strategically with long-term goals",
      "Share innovative ideas",
      "Inspire the team with a vision",
    ],
    "Team Player": [
      "Collaborate closely with the team",
      "Support and build on others' ideas",
      "Work closely with colleagues",
    ],
    Analyst: [
      "Analyze data to ensure accuracy",
      "Provide detailed insights",
      "Focus on critical details",
    ],
  },
  family: {
    Leader: [
      "Plan and organize the event",
      "Mediate and find common ground",
      "Guide the family forward",
    ],
    Visionary: [
      "Bring creative ideas for activities",
      "Propose new perspectives",
      "Think outside the box",
    ],
    "Team Player": [
      "Ensure everyone feels included",
      "Listen and empathize",
      "Foster harmony",
    ],
    Analyst: [
      "Handle practical details",
      "Analyze the root cause",
      "Provide logical input",
    ],
  },
  friendship: {
    Leader: ["Organize group activities", "Offer clear advice", "The planner"],
    Visionary: [
      "Suggest new experiences",
      "Inspire with optimism",
      "The idea generator",
    ],
    "Team Player": [
      "Enjoy group dynamics",
      "Be there emotionally",
      "The connector",
    ],
    Analyst: [
      "Focus on deep conversations",
      "Analyze their situation",
      "The thinker",
    ],
  },
  romantic: {
    Leader: ["Take the lead and organize", "Address issues directly"],
    Visionary: [
      "Plan something unique",
      "Find creative solutions",
      "With creative gestures",
    ],
    "Team Player": [
      "Focus on shared enjoyment",
      "Prioritize emotional connection",
      "By being supportive",
    ],
    Analyst: [
      "Consider practical details",
      "Analyze logically",
      "With thoughtful planning",
    ],
  },
};

const personalityDescriptions = {
  Leader: "Leaders take charge, organize, and guide others effectively.",
  Visionary: "Visionaries bring creativity and innovative ideas to the table.",
  "Team Player": "Team Players foster collaboration and emotional connection.",
  Analyst: "Analysts focus on details, logic, and thorough analysis.",
};

const determinePersonality = (answers, quizType) => {
  let scores = { Leader: 0, Visionary: 0, "Team Player": 0, Analyst: 0 };
  const totalQuestions = answers.length;

  answers.forEach((answer) => {
    Object.keys(personalityTypes[quizType]).forEach((type) => {
      if (personalityTypes[quizType][type].includes(answer)) {
        scores[type] += 1;
      }
    });
  });

  const percentages = Object.keys(scores).reduce((acc, type) => {
    acc[type] = ((scores[type] / totalQuestions) * 100).toFixed(0);
    return acc;
  }, {});

  const primaryType = Object.keys(percentages).reduce((a, b) =>
    percentages[a] > percentages[b] ? a : b
  );

  return { percentages, primaryType };
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || [];
  const quizType = location.state?.quizType || "office";
  const personality =
    answers.length > 0 ? determinePersonality(answers, quizType) : null;

  const [attempts, setAttempts] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
      let storedResults =
        JSON.parse(
          localStorage.getItem(`quizAttempts_${currentUser.uid}_${quizType}`)
        ) || [];

      if (
        personality &&
        (!storedResults.length ||
          storedResults[storedResults.length - 1].primaryType !==
            personality.primaryType)
      ) {
        storedResults.push(personality);
        localStorage.setItem(
          `quizAttempts_${currentUser.uid}_${quizType}`,
          JSON.stringify(storedResults)
        );
      }

      setAttempts(storedResults);
    }
  }, [personality, quizType]);

  const pieData = personality
    ? {
        labels: Object.keys(personality.percentages),
        datasets: [
          {
            data: Object.values(personality.percentages),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          },
        ],
      }
    : null;

  return (
    <div className="results-container max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Personality Type Meanings</h2>
      <ul className="mb-6">
        {Object.entries(personalityDescriptions).map(([type, desc]) => (
          <li key={type} className="mb-2">
            <strong>{type}:</strong> {desc}
          </li>
        ))}
      </ul>
      <hr className="my-6" />
      <h2 className="text-2xl font-bold mb-4">
        Your {quizType.charAt(0).toUpperCase() + quizType.slice(1)} Quiz Result
      </h2>
      {userId && attempts.length === 0 && !personality ? (
        <p>No quiz attempts yet. Please take the quiz first!</p>
      ) : (
        attempts.map((result, index) => (
          <div key={index} className="mb-6">
            <p className="mb-4">
              According to your {index + 1} attempt, you are mostly a{" "}
              <strong>{result.primaryType}</strong>, but also{" "}
              {Object.keys(result.percentages)
                .filter(
                  (type) =>
                    type !== result.primaryType && result.percentages[type] > 0
                )
                .join("-minded and ")}
              -minded!
            </p>
            {pieData && (
              <div className="max-w-md mx-auto">
                <Pie
                  data={pieData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            )}
            <ul className="mt-4">
              {Object.entries(result.percentages).map(([type, percentage]) => (
                <li key={type}>
                  {type}: {percentage}%
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
      <button
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("/")}
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default Results;
