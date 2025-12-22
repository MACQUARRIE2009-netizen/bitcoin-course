import { useState } from "react";
import "./App.css";
import quizzes from "./data/quizzes.json";

export default function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const quiz = quizzes[0]; // first quiz for now

  return (
    <div className="app">
      <header className="header">
        <h1>Bitcoin Institute</h1>
        <p>Professional Bitcoin Education Platform</p>
      </header>

      <main className="content">
        {/* VIDEO SECTION */}
        <section className="card">
          <h2>{quiz.topic}</h2>

          <video
            width="100%"
            controls
            onEnded={() => setShowQuiz(true)}
            style={{ borderRadius: "12px", marginTop: "1rem" }}
          >
            <source src="/videos/bitcoin-intro.mp4" type="video/mp4" />
            Your browser does not support video.
          </video>
        </section>

        {/* QUIZ SECTION */}
        {showQuiz && (
          <section className="card quiz">
            <h3>{quiz.question}</h3>

            {quiz.options.map((option, index) => (
              <button
                key={index}
                className={`quiz-option ${
                  selectedAnswer === index
                    ? index === quiz.correctIndex
                      ? "correct"
                      : "wrong"
                    : ""
                }`}
                onClick={() => setSelectedAnswer(index)}
              >
                {option}
              </button>
            ))}

            {selectedAnswer !== null && (
              <p className="explanation">{quiz.explanation}</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
