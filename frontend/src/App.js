import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import QuizSelection from "./components/QuizSelection";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            key="home"
            element={<Homepage user={user} />}
          />
          <Route
            path="/quiz-selection"
            key="quiz-selection"
            element={user ? <QuizSelection /> : <Navigate to="/login" />}
          />
          <Route
            path="/quiz"
            key="quiz"
            element={user ? <Quiz /> : <Navigate to="/login" />}
          />
          <Route
            path="/results"
            key="results"
            element={user ? <Results /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            key="login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            key="signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="*"
            key="not-found"
            element={<div>404: Page Not Found</div>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;