const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const {
  saveQuizResult,
  getQuizResults,
} = require("../controllers/quizController");
const authMiddleware = require("../middleware/auth");

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/quiz/results", authMiddleware, saveQuizResult);
router.get("/quiz/results", authMiddleware, getQuizResults);

module.exports = router;
