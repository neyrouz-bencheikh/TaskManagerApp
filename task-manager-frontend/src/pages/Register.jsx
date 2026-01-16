import { useState } from "react";
import { register } from "../services/authService";

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
      setError("Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container center">
      <form className="card" onSubmit={submit}>
        <h2>Sign up</h2>
        {error && <div className="alert">{error}</div>}
        <input className="input" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input className="input" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input className="input" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <input className="input" type="password" name="password_confirmation" placeholder="Confirm password" value={form.password_confirmation} onChange={handleChange} />
        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? "Creating" : "Signed up"}
        </button>
      </form>
    </div>
  );
}
