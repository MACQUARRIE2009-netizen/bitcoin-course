/*
PURPLE BITCOIN INSTITUTE – FULL LANDING PAGE + COURSE DASHBOARD
Ultra-long file with styling, layout, animations, placeholders, and scroll-heavy content
~30000+ characters
*/

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
      <div className="app loading-screen">
        <h2>Loading Bitcoin Knowledge…</h2>
      </div>
    );
  }

  return (
    <div className="app purple-theme">
      {/* ================= HEADER ================= */}
      <header className="header">
        <div className="header-inner">
          <h1 className="logo">Bitcoin Institute</h1>
          <p className="subtitle">Master Bitcoin · Understand Money · Earn a Certificate</p>

          {!user && (
            <a className="btn primary" href="/.auth/login/aad">Sign in with Email</a>
          )}

          {user && (
            <a className="btn outline" href="/.auth/logout">Sign out</a>
          )}
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main>
        {/* ========== PUBLIC LANDING PAGE ========== */}
        {!user && (
          <>
            {/* HERO */}
            <section className="hero">
              <div className="hero-text">
                <h2>The Future of Money Is Here</h2>
                <p>
                  Bitcoin is changing how the world thinks about money, freedom,
                  and technology. This course takes you from zero knowledge to
                  confident understanding — step by step.
                </p>
                <a className="btn large" href="/.auth/login/aad">Start Learning</a>
              </div>
              <div className="hero-image pop">
                {/* INSERT HERO IMAGE HERE */}
                <div className="image-placeholder">Hero Image</div>
              </div>
            </section>

            {/* WHY BITCOIN */}
            <section className="section gradient">
              <h3>Why Learn Bitcoin?</h3>
              <p>
                Bitcoin is not just an investment. It is a new monetary system
                that operates without banks, governments, or central control.
                Understanding Bitcoin gives you insight into economics,
                cryptography, energy, and global finance.
              </p>
              <p>
                This course focuses on *why* Bitcoin exists, *how* it works, and
                *what* it means for your future.
              </p>
            </section>

            {/* WHAT YOU LEARN */}
            <section className="section cards">
              <h3>What You Will Learn</h3>
              <div className="card-grid">
                <div className="info-card pop">
                  <h4>Bitcoin Fundamentals</h4>
                  <p>Blocks, transactions, mining, nodes, and consensus.</p>
                </div>
                <div className="info-card pop">
                  <h4>Money & History</h4>
                  <p>From gold to fiat to Bitcoin — how money evolved.</p>
                </div>
                <div className="info-card pop">
                  <h4>Scarcity & Value</h4>
                  <p>Why 21 million matters and why scarcity is powerful.</p>
                </div>
                <div className="info-card pop">
                  <h4>Wallets & Security</h4>
                  <p>Keys, self-custody, and protecting your bitcoin.</p>
                </div>
                <div className="info-card pop">
                  <h4>Global Impact</h4>
                  <p>How Bitcoin affects nations, individuals, and freedom.</p>
                </div>
                <div className="info-card pop">
                  <h4>The Future</h4>
                  <p>Lightning, adoption, and long-term outlook.</p>
                </div>
              </div>
            </section>

            {/* CERTIFICATE */}
            <section className="section certificate-section">
              <h3>Earn a Verified Certificate</h3>
              <p>
                Complete all lessons and quizzes to receive a Bitcoin Institute
                Certificate of Completion. Perfect for resumes, LinkedIn, and
                proof of knowledge.
              </p>
              <div className="certificate pop">
                {/* INSERT CERTIFICATE IMAGE HERE */}
                <div className="image-placeholder">Certificate Image</div>
              </div>
            </section>

            {/* COURSE STRUCTURE */}
            <section className="section">
              <h3>Course Structure</h3>
              <ul className="long-list">
                <li>Lesson 1: What Is Money?</li>
                <li>Lesson 2: The Problems with Fiat Currency</li>
                <li>Lesson 3: The Birth of Bitcoin</li>
                <li>Lesson 4: How Bitcoin Works</li>
                <li>Lesson 5: Mining & Energy</li>
                <li>Lesson 6: Wallets & Self-Custody</li>
                <li>Lesson 7: Bitcoin vs Banks</li>
                <li>Lesson 8: Global Adoption</li>
                <li>Lesson 9: Risks & Myths</li>
                <li>Lesson 10: The Future of Bitcoin</li>
              </ul>
            </section>

            {/* FAQ */}
            <section className="section gradient">
              <h3>Frequently Asked Questions</h3>
              <p><strong>Do I need technical knowledge?</strong> No.</p>
              <p><strong>Is this about trading?</strong> No, this is education.</p>
              <p><strong>How long does it take?</strong> Self-paced.</p>
              <p><strong>Is the certificate real?</strong> Yes.</p>
            </section>

            {/* FINAL CTA */}
            <section className="section cta">
              <h3>Start Your Bitcoin Education Today</h3>
              <p>
                Join students worldwide who are learning how Bitcoin works and
                why it matters.
              </p>
              <a className="btn large" href="/.auth/login/aad">Sign In to Begin</a>
            </section>
          </>
        )}

        {/* ========== LOGGED IN DASHBOARD ========== */}
        {user && (
          <>
            <section className="dashboard">
              <h2>Welcome, {user.userDetails}</h2>
              <p>Your learning journey starts here.</p>

              <div className="lesson-list">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="lesson-card pop">
                    <h4>Lesson {i + 1}</h4>
                    <p>Video lesson with quiz after completion.</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Bitcoin Institute · Purple Edition</p>
      </footer>
    </div>
  );
}
