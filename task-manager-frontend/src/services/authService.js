import axiosClient from "../api/axiosClient";

export const login = async (email, password) => {
  const { data } = await axiosClient.post("/auth/login", { email, password });
  return data; // { token, user }
};

export const register = async (payload) => {
  const { data } = await axiosClient.post("/auth/register", payload);
  return data; // { token, user }
};

export const logout = () => {
  localStorage.removeItem("token");
};
