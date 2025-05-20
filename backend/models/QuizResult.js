const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quizType: {
    type: String,
    enum: ["office", "family", "friendship", "romantic"],
    required: true,
  },
  result: {
    percentages: {
      type: Map,
      of: Number,
      required: true,
    },
    primaryType: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("QuizResult", quizResultSchema);
