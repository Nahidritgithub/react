import React, { useState } from "react";
import quizData from "../data";

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index) => {
    if (index === quizData[current].correct) {
      setScore(score + 1);
    }

    const next = current + 1;
    if (next < quizData.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
  };

  const progress = ((current + 1) / quizData.length) * 100;

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          <h2>
            Question {current + 1} of {quizData.length}
          </h2>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="question">{quizData[current].question}</p>
          <div className="options">
            {quizData[current].options.map((option, index) => (
              <button
                key={index}
                className="option-btn"
                onClick={() => handleAnswer(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="result">
          <h2>🎉 Quiz Completed!</h2>
          <p>
            You scored <strong>{score}</strong> out of {quizData.length}
          </p>
          <p className="remark">
            {score === quizData.length
              ? "Excellent!"
              : score > quizData.length / 2
              ? "Good Job!"
              : "Keep Practicing!"}
          </p>
          <button onClick={restartQuiz} className="restart-btn">
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
