import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import userIcon from "../assets/icons/login.png";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      setError(""); 
      window.location.href = "/";
    } catch (err) {
      setError("Invalid credentials"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      
      <div className="login">
        <form className="login-card" onSubmit={submit}>
          <div className="login-icon"><img src={userIcon} alt="Login Icon" /></div>
          <h2>Login</h2>

          {error && <div className="alert error">{error}</div>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            required
          />

          <div className="login-links">
            <Link to="/forgot-password">Forgot your password?</Link>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Connecting..." : "LOGIN"}
          </button>


          <p style={{ marginTop: "1rem" }}>
            Not registered yet ? <Link to="/register">Create new account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
