
import { useState } from "react";
import quizzes from "./bitcoin_quizzes_49_topics.json";
import "./App.css";

const LESSON_TITLES = quizzes.map(q => q.title);

export default function App() {
  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState([]);

  const unlockLesson = (index) => {
    if (!completed.includes(index)) {
      setCompleted([...completed, index]);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Bitcoin Institute</h1>
        <p>49-Lesson Interactive Bitcoin Course</p>
      </header>

      <div className="layout">
        <aside className="sidebar">
          {LESSON_TITLES.map((title, i) => {
            const locked = i !== 0 && !completed.includes(i - 1);
            return (
              <button
                key={i}
                className={`lesson-btn ${locked ? "locked" : ""}`}
                disabled={locked}
                onClick={() => setActiveLesson(i)}
              >
                Lesson {i + 1}
              </button>
            );
          })}
        </aside>

        <main className="content">
          <Lesson
            index={activeLesson}
            title={LESSON_TITLES[activeLesson]}
            quiz={quizzes[activeLesson]}
            onPass={() => unlockLesson(activeLesson)}
          />
        </main>
      </div>
    </div>
  );
}

function Lesson({ index, title, quiz, onPass }) {
  const [score, setScore] = useState(null);

  return (
    <div className="lesson-view">
      <h2>Lesson {index + 1}: {title}</h2>

      <div className="video-frame">
        <div className="video-placeholder">
          Video Placeholder (add iframe later)
        </div>
      </div>

      <Quiz quiz={quiz} onPass={onPass} setScore={setScore} />

      {score !== null && (
        <p className="score-display">Score: {score}%</p>
      )}
    </div>
  );
}

function Quiz({ quiz, onPass, setScore }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const selectAnswer = (qIndex, optIndex) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
  };

  const submitQuiz = () => {
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++;
    });
    const percent = Math.round((correct / quiz.questions.length) * 100);
    setScore(percent);
    setSubmitted(true);
    if (percent >= 70) onPass();
  };

  return (
    <div className="quiz">
      <h3>Lesson Quiz (70% required to pass)</h3>

      {quiz.questions.map((q, i) => (
        <div key={i} className="question">
          <p><strong>{i + 1}. {q.question}</strong></p>
          {q.options.map((opt, idx) => (
            <label key={idx} className="option">
              <input
                type="radio"
                name={`q-${i}`}
                checked={answers[i] === idx}
                disabled={submitted}
                onChange={() => selectAnswer(i, idx)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      {!submitted && (
        <button
          className="submit-btn"
          disabled={Object.keys(answers).length !== quiz.questions.length}
          onClick={submitQuiz}
        >
          Submit Quiz
        </button>
      )}

      {submitted && (
        <div className="result">
          {Object.keys(answers).length} answered.
        </div>
      )}
    </div>
  );
}
