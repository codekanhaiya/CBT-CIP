// Core Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// App Component & Utilities
import App from "./App";
import reportWebVitals from "./utils/reportWebVitals";

// Global Styles
import "./index.css";
import "react-toastify/ReactToastify.css";

// Root Mounting
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 🔹 Optional Title Header */}
      <header className="app-header my-3 text-center">
        <div className="card border-0 shadow bg-body-tertiary rounded mx-auto" style={{ maxWidth: "fit-content" }}>
          <h2 className="lg border-bottom border-primary border-2 p-2">CONNECTSPHERE</h2>
        </div>
      </header>

      {/* 🔹 Main App */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Performance Reporting
reportWebVitals();
