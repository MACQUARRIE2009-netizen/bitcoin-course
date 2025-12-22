import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/.auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientPrincipal) {
          setUser(data.clientPrincipal);
        }
      });
  }, []);

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
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>₿ Bitcoin Institute</h1>

      {!user ? (
        <a
          href="/.auth/login/aad"
          style={{
            marginTop: "2rem",
            background: "#7c3aed",
            padding: "12px 20px",
            borderRadius: "12px",
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Sign in with Email
        </a>
      ) : (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <p>Signed in as {user.userDetails}</p>
          <a
            href="/.auth/logout"
            style={{
              background: "#ef4444",
              padding: "10px 16px",
              borderRadius: "12px",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign out
          </a>
        </div>
      )}
    </div>
  );
}
