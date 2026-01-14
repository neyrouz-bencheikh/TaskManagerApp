import { createContext, useState, useEffect } from "react";
import { login as loginApi, logout as logoutApi } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
  }, [token]);

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    setToken(data.token);
    setUser(data.user);
  };

  // 👉 Ici tu mets la fonction logout
  const logout = () => {
    logoutApi(); // supprime le token côté backend si nécessaire
    setToken("");
    setUser(null);
    localStorage.removeItem("token"); // supprime le token côté frontend
    window.location.href = "/login";  // redirection vers la page login
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
