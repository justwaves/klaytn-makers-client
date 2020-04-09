import apiClient from "./apiClient";

export const login = ({ username, password }) =>
  apiClient.post("/api/auth/login", { username, password });

export const signup = ({ username, password }) =>
  apiClient.post("/api/auth/signup", { username, password });

export const check = () => apiClient.get("/api/auth/check");

export const logout = () => apiClient.post("/api/auth/logout");
