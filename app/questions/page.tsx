"use client";

import { fetchData } from "@/lib/fetch";
import { useState, useEffect } from "react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export default function QuizApp() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ question: string; selected: string; correct: string }[]>([]);
  const [timeLeft, setTimeLeft] = useState(600);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  let timer: NodeJS.Timeout;
useEffect(()=>{
    const fetchQuizz = async()=>{
        const quizz = await fetchData();
          if (Array.isArray(quizz)) {
        const shuffled = shuffleArray(quizz)
        setQuestions(shuffled.slice(0 , 20))
      } else {
        console.error("API did not return an array:", quizz);
        setQuestions([]); // Ensure it's always an array
      }
    }
    fetchQuizz();
} , [])


  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0) showFinalScore();
  }, [quizStarted, timeLeft]);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAttemptedQuestions(0);
    setUserAnswers([]);
    setTimeLeft(600);
  };

  const selectAnswer = (selectedOption: string) => {
    if (currentQuestionIndex >= questions.length) return;

    const correctAnswer = questions[currentQuestionIndex].answer;
    setUserAnswers((prev) => [...prev, { question: questions[currentQuestionIndex].question, selected: selectedOption, correct: correctAnswer }]);
    setAttemptedQuestions((prev) => prev + 1);
    if (selectedOption === correctAnswer) setScore((prev) => prev + 1);
    
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      showFinalScore();
    }
  };

  const showFinalScore = () => {
    setQuizFinished(true);
    setQuizStarted(false);
    clearInterval(timer);
  };

  const restartQuiz = () => {
    setQuestions(shuffleArray(questions));
    startQuiz();
  };

  const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-300 to-pink-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center overflow-y-auto max-h-[90vh]">
        {!quizStarted && !quizFinished && (
          <button onClick={startQuiz} className="bg-pink-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-pink-700">
            Start Quiz
          </button>
        )}

        {quizStarted && !quizFinished && questions.length > 0 && (
          <div>
            <h2 className="text-lg font-bold">Q{currentQuestionIndex + 1}: {questions[currentQuestionIndex]?.question}</h2>
            <div className="mt-4">
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <button key={index} onClick={() => selectAnswer(option)} className="block w-full p-2 my-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                  {option}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm">Attempted: {attemptedQuestions} / {questions.length}</p>
            <div className="w-full bg-gray-300 rounded-md overflow-hidden mt-2">
              <div className="bg-red-500 h-2" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
            </div>
            <p className="mt-2 text-sm font-bold">Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
          </div>
        )}

        {quizFinished && (
          <div>
            <h2 className="text-lg font-bold">Your Score: {score} / {questions.length}</h2>
            <p className="text-sm">Total Attempted Questions: {attemptedQuestions} / {questions.length}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Review Your Answers:</h3>
              {userAnswers.map((ans, index) => (
                <div key={index} className="text-left bg-gray-100 p-2 rounded-md mt-2">
                  <p><strong>Q{index + 1}:</strong> {ans.question}</p>
                  <p>Your Answer: <span className={ans.selected === ans.correct ? "text-green-500" : "text-red-500"}>{ans.selected} {ans.selected === ans.correct ? "✔️" : "❌"}</span></p>
                  <p>Correct Answer: <span className="text-green-500">{ans.correct} ✔️</span></p>
                </div>
              ))}
            </div>
            <button onClick={restartQuiz} className="bg-pink-500 text-white py-2 px-4 rounded-lg text-lg mt-4 hover:bg-pink-700">
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
