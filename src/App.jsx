import "./App.css";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui",
        borderRadius: "24px",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        ₿ Bitcoin Institute
      </h1>

      <p style={{ maxWidth: 600, textAlign: "center", opacity: 0.9 }}>
        Learn Bitcoin the way pilots learn aircraft — structured lessons,
        videos, and quizzes after every module.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <a
          href="/.auth/login/aad"
          style={{
            background: "#7c3aed",
            padding: "12px 20px",
            borderRadius: "14px",
            color: "white",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Sign in with Email
        </a>
      </div>
    </div>
  );
}

