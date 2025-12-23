import { useState } from "react";
import "./App.css";
import rawQuizzes from "./bitcoin_quizzes_49_topics.json";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useMsal } from "@azure/msal-react";

/* ======================
   AZURE CONFIG
   ====================== */
const msalInstance = new PublicClientApplication({
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: "https://login.microsoftonline.com/common",
    redirectUri: window.location.origin
  }
});

/* ======================
   QUIZ DATA FIX
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
   APP
   ====================== */
export default function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <MainApp />
    </MsalProvider>
  );
}

function MainApp() {
  const { instance, accounts } = useMsal();
  const user = accounts[0];

  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState([]);

  const login = () => instance.loginPopup({ scopes: ["User.Read"] });
  const logout = () => instance.logoutPopup();

  const unlockLesson = (index) => {
    if (!completed.includes(index)) {
      setCompleted([...completed, index]);
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
        <p>{user.username}</p>
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
   LESSON + QUIZ
   ====================== */
function Lesson({ index, quiz, onPass }) {
  const [videoWatched, setVideoWatched] = useState(false);
  const [score, setScore] = useState(null);

  return (
    <>
      <h2>{quiz.title}</h2>

      <div className="video-frame">
        <button onClick={() => setVideoWatched(true)}>
          Mark Video as Watched
        </button>
      </div>

      {videoWatched && (
        <Quiz quiz={quiz} onPass={onPass} setScore={setScore} />
      )}

      {score !== null && (
        <p className="score-display">Score: {score}%</p>
      )}
    </>
  );
}

function Quiz({ quiz, onPass, setScore }) {
  const [answers, setAnswers] = useState({});

  const submit = () => {
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++;
    });

    const score = Math.round(
      (correct / quiz.questions.length) * 100
    );

    setScore(score);
    if (score >= 70) onPass();
  };

  return (
    <div className="quiz">
      {quiz.questions.map((q, i) => (
        <div key={i}>
          <p>{q.question}</p>
          {q.options.map((o, j) => (
            <label key={j}>
              <input
                type="radio"
                name={`q${i}`}
                onChange={() =>
                  setAnswers(a => ({ ...a, [i]: j }))
                }
              />
              {o}
            </label>
          ))}
        </div>
      ))}
      <button className="submit-btn" onClick={submit}>
        Submit Quiz
      </button>
    </div>
  );
}
