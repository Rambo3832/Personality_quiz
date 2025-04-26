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
  Leader:
    "Leaders take charge, organize, and guide others effectively in the workplace.",
  Visionary:
    "Visionaries bring creativity and innovative ideas to the table at work.",
  "Team Player":
    "Team Players foster collaboration and emotional connection in teams.",
  Analyst:
    "Analysts focus on details, logic, and thorough analysis in professional settings.",
  Caregiver:
    "Caregivers are nurturing, empathetic, and supportive, creating a warm family environment.",
  Protector:
    "Protectors are strong and vigilant, safeguarding their family’s well-being.",
  Rebel:
    "Rebels bring unconventional ideas and bold choices to family dynamics.",
  Independent:
    "Independents prioritize their own space and decisions within the family.",
  "Loyal Friend":
    "Loyal Friends are reliable and steadfast, always there for their friends.",
  "Party Enthusiast":
    "Party Enthusiasts bring high energy and fun to social settings.",
  "Wise Counselor":
    "Wise Counselors offer thoughtful advice and deep connections in friendships.",
  "Lone Wolf":
    "Lone Wolves enjoy their own company and maintain independence in social groups.",
  "Romantic Dreamer":
    "Romantic Dreamers value deep emotional connections and heartfelt moments.",
  "Independent Soul":
    "Independent Souls maintain personal freedom while cherishing their relationship.",
  "Passionate Partner":
    "Passionate Partners bring intensity and excitement to their romantic life.",
  "Logical Lover":
    "Logical Lovers approach relationships with thoughtfulness and stability.",
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
        {Object.entries(personalityDescriptions)
          .filter(([type]) =>
            Object.keys(personalityTypes[quizType]).includes(type)
          )
          .map(([type, desc]) => (
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
              The user is mostly a <strong>{result.primaryType}</strong>, but
              also{" "}
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
