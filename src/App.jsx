import { useState } from "react";
import "./App.css";
import quizzes from "./bitcoin_quizzes_49_topics.json";

export default function App() {
  const [sectionIndex, setSectionIndex] = useState(0);

  const section = quizzes.sections?.[sectionIndex];

  return (
    <div className="app">
      <header className="header">
        <h1>Bitcoin Course</h1>
        <button>Email Login</button>
      </header>

      <div className="layout">
        <aside className="sidebar">
          {quizzes.sections.map((s, i) => (
            <button
              key={i}
              className="lesson-btn"
              onClick={() => setSectionIndex(i)}
            >
              {s.sectionTitle}
            </button>
          ))}
        </aside>

        <main className="content">
          {section ? (
            <div className="quiz">
              <h2>{section.sectionTitle}</h2>

              {section.questions.map((q, qi) => (
                <div key={qi} className="question">
                  <p>{q.question}</p>

                  {Object.entries(q.options).map(([key, val]) => (
                    <label key={key} className="option">
                      <input type="radio" name={`q-${qi}`} />
                      {key}. {val}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p>No section loaded</p>
          )}
        </main>
      </div>
    </div>
  );
}
