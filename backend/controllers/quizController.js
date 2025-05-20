const QuizResult = require("../models/QuizResult");

exports.saveQuizResult = async (req, res) => {
  const { userId, quizType, result } = req.body;

  try {
    // Verify userId matches the token
    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const quizResult = new QuizResult({
      userId,
      quizType,
      result,
    });

    await quizResult.save();
    res.status(201).json({ message: "Quiz result saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getQuizResults = async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.user.id });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
