"use server"
import mongoose from "mongoose";

const quizSchema  =  new mongoose.Schema({
      question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  answer: {
    type: String,
    required: true
  }
})

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz" , quizSchema);

export default Quiz