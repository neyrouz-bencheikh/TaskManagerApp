import React, { useState } from "react";
import { Link } from "react-router-dom";
import userIcon from "../assets/icons/password.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="login-wrapper">
      
      <div className="login">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-icon"><img src={userIcon} alt="Password Icon" /></div>
          <h2>Forgot Password</h2>

          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={!email}>
            Send Reset Link
          </button>

          {message && (
            <p
              className={`auth-message ${
                message.toLowerCase().includes("success") ? "success" : "error"
              }`}
            >
              {message}
            </p>
          )}

          <p style={{ marginTop: "1rem" }}>
            Remembered your password? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
