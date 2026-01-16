import { createContext, useState, useEffect } from "react";
import { login as loginApi, logout as logoutApi } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
  }, [token]);

  //fct login
  const login = async (email, password) => {
    const data = await loginApi(email, password);
    setToken(data.token); //stocke le token reçu
    setUser(data.user); //stocke user data
  };

  //fct logout
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
