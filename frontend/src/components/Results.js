import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
      "Take the lead to mediate",
      "Direct and actionable",
      "Set clear objectives",
      "By leading projects",
      "Reorganize and push forward",
      "Lead by example",
      "Plan a recognition event",
    ],
    Visionary: [
      "Plan strategically with long-term goals",
      "Share innovative ideas",
      "Inspire the team with a vision",
      "Propose creative solutions",
      "Encouraging and visionary",
      "Bring new perspectives",
      "By exploring new ideas",
      "Rethink the approach creatively",
      "Experiment with new methods",
      "Share a bold vision for the future",
    ],
    "Team Player": [
      "Collaborate closely with the team",
      "Support and build on others' ideas",
      "Work closely with colleagues",
      "Listen to all parties involved",
      "Supportive and empathetic",
      "Foster team unity",
      "By collaborating with others",
      "Rally the team for support",
      "Learn from colleagues",
      "Celebrate with the team",
    ],
    Analyst: [
      "Analyze data to ensure accuracy",
      "Provide detailed insights",
      "Focus on critical details",
      "Analyze the root cause",
      "Detailed and constructive",
      "Ensure accuracy in execution",
      "By mastering details",
      "Investigate the issue thoroughly",
      "Study resources in depth",
      "Document the achievement",
    ],
  },
  family: {
    Caregiver: [
      "Create a warm, welcoming atmosphere",
      "Listen empathetically to find harmony",
      "Nurture and support consensus",
      "Share heartfelt moments together",
      "Offer emotional care and comfort",
      "Uphold them with love",
      "Prioritize family’s comfort",
      "Create heartfelt celebrations",
      "Guide with kindness and patience",
      "Comfort and soothe everyone",
    ],
    Protector: [
      "Ensure everyone is safe and cared for",
      "Stand firm to protect family values",
      "Safeguard the family’s well-being",
      "Plan secure, stable activities",
      "Provide strong, protective guidance",
      "Ensure they’re meaningful and safe",
      "Focus on financial security",
      "Ensure a secure, joyful event",
      "Protect and mentor firmly",
      "Take charge to stabilize",
    ],
    Rebel: [
      "Bring a fun, unconventional twist",
      "Challenge norms to find a new way",
      "Push for bold, unique choices",
      "Try spontaneous adventures",
      "Encourage them to break free",
      "Reinvet them with creativity",
      "Explore unconventional savings",
      "Make it uniquely memorable",
      "Inspire with bold ideas",
      "Break tension with humor",
    ],
    Independent: [
      "Plan independently to suit your needs",
      "Analyze the issue on your own",
      "Make decisions independently",
      "Enjoy your own space",
      "Give advice from a distance",
      "Participate minimally",
      "Manage your own finances",
      "Celebrate on your own terms",
      "Encourage self-learning",
      "Retreat to process alone",
    ],
  },
  friendship: {
    "Loyal Friend": [
      "Stay loyal and dependable",
      "Be a steadfast listener",
      "The reliable anchor",
      "Ensure everyone’s included",
      "Stay loyal and reconcile",
      "Show unwavering support",
      "Check in consistently",
      "Make everyone feel at ease",
      "Bond over shared loyalty",
      "Stay loyal and reach out",
    ],
    "Party Enthusiast": [
      "Bring high energy to the group",
      "Cheer them up with fun",
      "The life of the party",
      "Make it a lively event",
      "Lighten the mood with fun",
      "Throw a festive celebration",
      "Keep things exciting",
      "Create a fun vibe",
      "Explore with enthusiasm",
      "Keep the group lively",
    ],
    "Wise Counselor": [
      "Offer thoughtful advice",
      "Provide wise, calm guidance",
      "The trusted advisor",
      "Choose meaningful activities",
      "Offer balanced perspectives",
      "Give thoughtful praise",
      "Share meaningful talks",
      "Facilitate deep connections",
      "Discuss in depth",
      "Reflect on their needs",
    ],
    "Lone Wolf": [
      "Enjoy your own company",
      "Respect their space",
      "The independent spirit",
      "Go with your own plan",
      "Keep your distance",
      "Congratulate quietly",
      "Connect when it suits you",
      "Let them integrate alone",
      "Pursue your interests solo",
      "Focus on your own path",
    ],
  },
  romantic: {
    "Romantic Dreamer": [
      "Craft a deeply emotional experience",
      "With heartfelt gestures",
      "Seek emotional understanding",
      "Create a romantic moment",
      "Encourage with deep care",
      "Share intimate moments",
      "Comfort with empathy",
      "Dream of emotional connection",
      "With a loving gesture",
      "Deepen emotional bonds",
    ],
    "Independent Soul": [
      "Choose something uniquely personal",
      "Through personal freedom",
      "Maintain your independence",
      "Celebrate your unique bond",
      "Respect their autonomy",
      "Enjoy separate interests",
      "Give space for freedom",
      "Value individual growth",
      "With a personal touch",
      "Foster personal freedom",
    ],
    "Passionate Partner": [
      "Make it fiery and exciting",
      "With intense devotion",
      "Confront with passion",
      "Make it vibrant and bold",
      "Fuel their drive passionately",
      "Embrace thrilling activities",
      "Face it with intensity",
      "Pursue shared passions",
      "With bold excitement",
      "Ignite shared enthusiasm",
    ],
    "Logical Lover": [
      "Plan with practicality in mind",
      "With thoughtful reasoning",
      "Resolve with logic",
      "Plan a balanced event",
      "Offer practical advice",
      "Focus on mutual goals",
      "Analyze calmly",
      "Plan logically",
      "With careful thought",
      "Build a stable foundation",
    ],
  },
};

const personalityDescriptions = {
  Leader: "Guides and organizes teams with confidence.",
  Visionary: "Inspires with creative and bold ideas.",
  "Team Player": "Builds strong team bonds through collaboration.",
  Analyst: "Focuses on details and logical solutions.",
  Caregiver: "Nurtures family with warmth and care.",
  Protector: "Keeps family safe and secure.",
  Rebel: "Brings fun and unique ideas to family life.",
  Independent: "Values personal space in family settings.",
  "Loyal Friend": "Always reliable and supportive in friendships.",
  "Party Enthusiast": "Brings energy and fun to social groups.",
  "Wise Counselor": "Offers thoughtful advice to friends.",
  "Lone Wolf": "Enjoys independence in social settings.",
  "Romantic Dreamer": "Seeks deep emotional connections in love.",
  "Independent Soul": "Values freedom in relationships.",
  "Passionate Partner": "Brings excitement and intensity to romance.",
  "Logical Lover": "Approaches love with practical stability.",
};

const determinePersonality = (answers, quizType) => {
  let scores = {
    office: { Leader: 0, Visionary: 0, "Team Player": 0, Analyst: 0 },
    family: { Caregiver: 0, Protector: 0, Rebel: 0, Independent: 0 },
    friendship: {
      "Loyal Friend": 0,
      "Party Enthusiast": 0,
      "Wise Counselor": 0,
      "Lone Wolf": 0,
    },
    romantic: {
      "Romantic Dreamer": 0,
      "Independent Soul": 0,
      "Passionate Partner": 0,
      "Logical Lover": 0,
    },
  }[quizType];
  const totalQuestions = answers.length;

  answers.forEach((answer) => {
    Object.keys(personalityTypes[quizType]).forEach((type) => {
      if (personalityTypes[quizType][type].includes(answer)) {
        scores[type] += 1;
      }
    });
  });

  const percentages = new Map(Object.entries(scores));
  const totalScore = Array.from(percentages.values()).reduce(
    (sum, val) => sum + val,
    0
  );
  percentages.forEach((val, key) => {
    const percentage =
      totalScore === 0 ? 0 : Math.round((val / totalScore) * 100);
    percentages.set(key, percentage);
  });

  const primaryType = Array.from(percentages.entries()).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];

  return {
    percentages: Object.fromEntries(percentages),
    primaryType,
  };
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || [];
  const quizType = location.state?.quizType || null;
  const [personality, setPersonality] = useState(null);
  const [allAttempts, setAllAttempts] = useState({
    office: [],
    family: [],
    friendship: [],
    romantic: [],
  });
  const [error, setError] = useState("");
  const hasSavedResult = useRef(false); // Prevent duplicate saves

  useEffect(() => {
    if (answers.length > 0 && quizType && !hasSavedResult.current) {
      const computedPersonality = determinePersonality(answers, quizType);
      setPersonality(computedPersonality);

      // Save result to backend
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (token && user) {
        hasSavedResult.current = true; // Mark as saved
        fetch("http://localhost:5000/api/quiz/results", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: user.id,
            quizType,
            result: computedPersonality,
          }),
        })
          .then((response) => {
            if (!response.ok) throw new Error("Failed to save quiz result");
            return response.json();
          })
          .then(() => {
            // Fetch updated results after saving
            fetch("http://localhost:5000/api/quiz/results", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => {
                if (!response.ok)
                  throw new Error("Failed to fetch quiz results");
                return response.json();
              })
              .then((data) => {
                const updatedAttempts = {
                  office: [],
                  family: [],
                  friendship: [],
                  romantic: [],
                };
                data.forEach((result) => {
                  updatedAttempts[result.quizType].push(result.result);
                });
                setAllAttempts(updatedAttempts);
              })
              .catch((err) => setError(err.message));
          })
          .catch((err) => setError(err.message));
      }
    }
  }, [answers, quizType]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      // Fetch all quiz results for the user on mount
      fetch("http://localhost:5000/api/quiz/results", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch quiz results");
          return response.json();
        })
        .then((data) => {
          const updatedAttempts = {
            office: [],
            family: [],
            friendship: [],
            romantic: [],
          };
          data.forEach((result) => {
            updatedAttempts[result.quizType].push(result.result);
          });
          setAllAttempts(updatedAttempts);
        })
        .catch((err) => setError(err.message));
    }
  }, []);

  const pieData = (result) =>
    result
      ? {
          labels: Object.keys(result.percentages).filter(
            (type) => result.percentages[type] > 0
          ),
          datasets: [
            {
              data: Object.values(result.percentages).filter((val) => val > 0),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
              ],
            },
          ],
        }
      : null;

  const quizTypes = ["office", "family", "friendship", "romantic"];

  const handleNavigateHome = () => {
    navigate("/", { replace: true, state: {} });
  };

  return (
    <div className="results-container">
      {error && <p className="error-message">{error}</p>}
      {quizType ? (
        <div className="personality-meanings-container">
          <fieldset className="personality-meanings">
            <legend>
              {quizType.charAt(0).toUpperCase() + quizType.slice(1)} Personality
              Types
            </legend>
            <ul>
              {Object.entries(personalityDescriptions)
                .filter(([type]) =>
                  Object.keys(personalityTypes[quizType]).includes(type)
                )
                .map(([type, desc]) => (
                  <li key={type}>
                    <strong>{type}</strong>: {desc}
                  </li>
                ))}
            </ul>
          </fieldset>
        </div>
      ) : (
        <div className="personality-meanings-container">
          {quizTypes.map((type) => (
            <fieldset key={type} className="personality-meanings">
              <legend>
                {type.charAt(0).toUpperCase() + type.slice(1)} Personality Types
              </legend>
              <ul>
                {Object.entries(personalityDescriptions)
                  .filter(([personalityType]) =>
                    Object.keys(personalityTypes[type]).includes(
                      personalityType
                    )
                  )
                  .map(([personalityType, desc]) => (
                    <li key={personalityType}>
                      <strong>{personalityType}</strong>: {desc}
                    </li>
                  ))}
              </ul>
            </fieldset>
          ))}
        </div>
      )}

      {quizType && personality ? (
        <div className="results-box-container">
          <div className="results-box">
            <h2>
              Your {quizType.charAt(0).toUpperCase() + quizType.slice(1)} Quiz
              Result
            </h2>
            <div className="attempt">
              <h3>Current Attempt</h3>
              <p>
                You are mostly a <strong>{personality.primaryType}</strong>, but
                also{" "}
                {Object.keys(personality.percentages)
                  .filter(
                    (type) =>
                      type !== personality.primaryType &&
                      personality.percentages[type] > 0
                  )
                  .join("-minded and ")}
                -minded!
              </p>
              {pieData(personality) && (
                <div className="pie-chart">
                  <Pie
                    data={pieData(personality)}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: true,
                          position: "top",
                          labels: {
                            boxWidth: 20,
                            padding: 10,
                            font: {
                              size: 12,
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              )}
              <ul>
                {Object.entries(personality.percentages).map(
                  ([type, percentage]) => (
                    <li key={type}>
                      {type}: {percentage}%
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="results-box-container">
          {quizTypes.map((type) => (
            <div key={type} className="results-box">
              <h2>
                {type.charAt(0).toUpperCase() + type.slice(1)} Quiz Results
              </h2>
              {allAttempts[type].length === 0 ? (
                <p>No attempts yet for this quiz type.</p>
              ) : (
                allAttempts[type].map((result, index) => (
                  <div key={index} className="attempt">
                    <h3>Attempt #{index + 1}</h3>
                    <p>
                      You are mostly a <strong>{result.primaryType}</strong>,
                      but also{" "}
                      {Object.keys(result.percentages)
                        .filter(
                          (t) =>
                            t !== result.primaryType &&
                            result.percentages[t] > 0
                        )
                        .join("-minded and ")}
                      -minded!
                    </p>
                    {pieData(result) && (
                      <div className="pie-chart">
                        <Pie
                          data={pieData(result)}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                display: true,
                                position: "top",
                                labels: {
                                  boxWidth: 20,
                                  padding: 10,
                                  font: {
                                    size: 12,
                                  },
                                },
                              },
                            },
                          }}
                        />
                      </div>
                    )}
                    <ul>
                      {Object.entries(result.percentages).map(
                        ([t, percentage]) => (
                          <li key={t}>
                            {t}: {percentage}%
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      )}

      <button className="home-button" onClick={handleNavigateHome}>
        Go Back to Home
      </button>
    </div>
  );
};

export default Results;
