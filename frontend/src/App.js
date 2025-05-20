// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import QuizSelection from "./components/QuizSelection";
import Quiz from "./components/Quiz"; // Import the Quiz component
import Results from "./components/Results";
import Navbar from "./components/Navbar";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Homepage user={user} setUser={setUser} />} />
        <Route
          path="/quiz-selection"
          element={user ? <QuizSelection /> : <Navigate to="/" />}
        />
        <Route path="/quiz" element={user ? <Quiz /> : <Navigate to="/" />} />
        <Route
          path="/results"
          element={user ? <Results /> : <Navigate to="/" />}
        />
        <Route path="*" element={<div>404: Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
