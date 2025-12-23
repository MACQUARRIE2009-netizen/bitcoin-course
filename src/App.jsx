import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/.auth/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data?.clientPrincipal || null);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="app center">
        <h2>Loading…</h2>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Bitcoin Institute</h1>
        <p className="tagline">Learn Bitcoin. Understand Money. Earn a Certificate.</p>

        {!user && (
          <a className="btn" href="/.auth/login/aad">
            Sign in with Email
          </a>
        )}

        {user && (
          <a className="btn outline" href="/.auth/logout">
            Sign out
          </a>
        )}
      </header>

      <main>
        {!user && (
          <>
            <section className="hero">
              <h2>Why Take a Bitcoin Course?</h2>
              <p>
                Bitcoin is more than just digital money. It is a breakthrough in
                technology, economics, and personal freedom. Our course gives you
                a clear, beginner-friendly path to understanding Bitcoin from the
                ground up.
              </p>
            </section>

            <section className="info-section">
              <h3>What You Will Learn</h3>
              <ul>
                <li>How Bitcoin works (blocks, mining, nodes)</li>
                <li>Why Bitcoin is scarce and valuable</li>
                <li>How Bitcoin compares to traditional money</li>
                <li>Wallets, keys, and basic security</li>
                <li>Real-world use cases and future potential</li>
              </ul>
            </section>

            <section className="info-section">
              <h3>Who This Course Is For</h3>
              <p>
                This course is designed for students, professionals, creators,
                and anyone curious about Bitcoin. No technical or financial
                background is required.
              </p>
            </section>

            <section className="info-section">
              <h3>Earn a Certificate</h3>
              <p>
                After completing all lessons and quizzes, you will receive an
                official Bitcoin Institute Certificate of Completion.
              </p>
              <div className="certificate-placeholder">
                {/* Insert certificate image here */}
                <p>Certificate Image Placeholder</p>
              </div>
            </section>

            <section className="info-section">
              <h3>Why Bitcoin Matters</h3>
              <p>
                Bitcoin introduces a new financial system that is open,
                decentralized, and resistant to censorship. Understanding it
                helps you better understand the future of money.
              </p>
            </section>

            <section className="cta">
              <h3>Get Started Today</h3>
              <p>Sign in to access the full course and begin learning.</p>
              <a className="btn large" href="/.auth/login/aad">
                Sign In to Start the Course
              </a>
            </section>
          </>
        )}

        {user && (
          <>
            <p className="welcome">
              Welcome, <strong>{user.userDetails}</strong>
            </p>

            <div className="card">
              <h2>Course Dashboard</h2>
              <p>
                Scroll through the lessons below. Each lesson includes a video
                followed by a quiz to test your understanding.
              </p>
            </div>
          </>
        )}
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Bitcoin Institute</p>
      </footer>
    </div>
  );
}
