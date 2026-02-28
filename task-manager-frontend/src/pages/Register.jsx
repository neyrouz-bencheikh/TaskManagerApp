import { useState } from "react";
import { register } from "../services/authService";
import { Link } from "react-router-dom";
import userIcon from "../assets/icons/login.png";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await register(form);
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (err) {
      setError("Error! Try Again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      
      <div className="login">
        <form className="login-card" onSubmit={submit}>
          <div className="login-icon"><img src={userIcon} alt="Signup Icon" /></div>
          <h2>Sign up</h2>

          {error && <div className="alert error">{error}</div>}

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={form.password_confirmation}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Sign up"}
          </button>

          <p style={{ marginTop: "1rem" }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
