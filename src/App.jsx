import "./App.css";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Bitcoin Institute</h1>
        <p>Professional Bitcoin Education Platform</p>
      </header>

      <main className="content">
        <section className="card">
          <h2>Foundations & History</h2>
          <p>Learn the origin, philosophy, and evolution of Bitcoin.</p>
        </section>

        <section className="card">
          <h2>Technical Foundations</h2>
          <p>Understand blockchain, cryptography, mining, and consensus.</p>
        </section>

        <section className="card">
          <h2>Quizzes & Progress</h2>
          <p>Test your knowledge with structured quizzes.</p>
        </section>
      </main>
    </div>
  );
}
