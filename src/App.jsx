import { useState } from "react";
import "./App.css";
import rawQuizzes from "./bitcoin_quizzes_49_topics.json";

/* ======================
   AZURE MSAL CONFIG
   ====================== */
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useMsal } from "@azure/msal-react";

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: "https://login.microsoftonline.com/consumers",
    redirectUri: window.location.origin
  },
  cache: {
    cacheLocation: "localStorage"
  }
});

/* ======================
   QUIZ DATA NORMALIZATION
   ====================== */
const quizzes = Object.values(rawQuizzes).map(topic => ({
  title: topic.title,
  questions: topic.questions.map(q => ({
    question: q.question,
    options: q.options,
    correctIndex: q.options.indexOf(q.answer)
  }))
}));

/* ======================
   ROOT WRAPPER
   ====================== */
export default function AppWrapper() {
  return (
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  );
}

/* ======================
   MAIN APP
   ====================== */
function App() {
  const { instance, accounts } = useMsal();
  const user = accounts[0];

  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState([]);

  const login = async () => {
    await instance.loginPopup({
      scopes: ["User.Read"]
    });
  };

  const logout = async () => {
    await instance.logoutPopup();
  };

  const unlockLesson = (index) => {
    if (!completed.includes(index)) {
      setCompleted(prev => [...prev, index]);
    }
  };

  if (!user) {
    return (
      <div className="app">
        <h1>Bitcoin Institute</h1>
        <button className="submit-btn" onClick={login}>
          Sign in with Microsoft
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Bitcoin Institute</h1>
        <p>Signed in as {user.username}</p>
        <button onClick={logout}>Logout</button>
      </header>

      <div className="layout">
        <aside className="sidebar">
          {quizzes.map((_, i) => {
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
            quiz={quizzes[activeLesson]}
            onPass={() => unlockLesson(activeLesson)}
          />
        </main>
      </div>
    </div>
  );
}

/* ======================
   LESSON
   ====================== */
function Lesson({ index, quiz, onPass }) {
  const [videoWatched, setVideoWatched] = useState(false);
  const [score, setScore] = useState(null);

  return (
    <>
      <h2>Lesson {index + 1}: {quiz.title}</h2>

      <div className="video-frame">
        <p>Lesson Video</p>
        <button onClick={() => setVideoWatched(true)}>
          Mark Video as Watched
        </button>
      </div>

      {videoWatched ? (
        <Quiz quiz={quiz} onPass={onPass} setScore={setScore} />
      ) : (
        <p>Watch the video to unlock the quiz</p>
      )}

      {score !== null && (
        <p className="score-display">Score: {score}%</p>
      )}
    </>
  );
}

/* ======================
   QUIZ
   ====================== */
function Quiz({ quiz, onPass, setScore }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const submitQuiz = () => {
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++;
    });

    const percent = Math.round(
      (correct / quiz.questions.length) * 100
    );

    setScore(percent);
    setSubmitted(true);

    if (percent >= 70) {
      onPass();
    }
  };

  return (
    <div className="quiz">
      <h3>Quiz (70% required to pass)</h3>

      {quiz.questions.map((q, i) => (
        <div key={i} className="question">
          <p><strong>{i + 1}. {q.question}</strong></p>

          {q.options.map((opt, idx) => (
            <label key={idx} className="option">
              <input
                type="radio"
                name={`q-${i}`}
                disabled={submitted}
                onChange={() =>
                  setAnswers(prev => ({ ...prev, [i]: idx }))
                }
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
    </div>
  );
}
