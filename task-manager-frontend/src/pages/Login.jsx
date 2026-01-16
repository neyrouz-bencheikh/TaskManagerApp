import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";//pour naviguer vers une autre page sans recharger le site

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault(); //empêche le rechargement de la page
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      window.location.href = "/";
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container center">
      <form className="card" onSubmit={submit}>
        <h2>Login</h2>
        {error && <div className="alert">{error}</div>}
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? "Connecting..." : "Logged in"}
        </button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        Not registered yet ? <Link to="/register">Create new account</Link>
      </p>
    </div>
  );
}