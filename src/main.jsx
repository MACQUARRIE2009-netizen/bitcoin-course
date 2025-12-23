import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Make sure this points to your App component
import "./index.css"; // Default CSS (if needed)
import "./futurist-purple-quiz-expanded.css"; // Your futuristic purple theme CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
