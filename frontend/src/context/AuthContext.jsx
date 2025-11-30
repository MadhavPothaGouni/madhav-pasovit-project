// src/context/AuthContext.jsx
import React, { useState, useEffect } from "react";
// AuthContext itself lives in authContextValue.js
import AuthContextDefault from "./authContextValue";
import api from "../services/api";

// Re-export the context object under the same name your app expects
export const AuthContext = AuthContextDefault;

// Named export + default export for the Provider so existing imports work:
// import { AuthProvider } from './context/AuthContext'
// import AuthProvider from './context/AuthContext'
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    if (res?.data?.user) setUser(res.data.user);
    return res.data;
  };

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    if (res?.data?.user) setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUser(null);
    localStorage.removeItem("cart");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// default export as well (keeps older default-import patterns safe)
export default AuthProvider;
