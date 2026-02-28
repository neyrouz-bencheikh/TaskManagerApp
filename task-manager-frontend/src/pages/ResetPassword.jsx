import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import userIcon from "../assets/icons/password.png";

function ResetPassword() {
  const query = new URLSearchParams(useLocation().search);
  const email = query.get("email");
  const token = query.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          password,
          password_confirmation: confirm,
        }),
      });
      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="login-wrapper">
      
      <div className="login">
        <form className="login-card" onSubmit={handleReset}>
          <div className="login-icon"><img src={userIcon} alt="Password Icon" /></div>
          <h2>Reset Password</h2>

          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button type="submit">Reset</button>

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
            Back to <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
