// src/components/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as awLogin,
         signup as awSignup,
         logout as awLogout,
         getUser as awGetUser } from '../lib/appwrite';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if we already have a session
  useEffect(() => {
    awGetUser()
      .then(u => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const u = await awLogin(email, password);
    setUser(u);
  };

  const signup = async (email, password) => {
    const u = await awSignup(email, password);
    setUser(u);
  };

  const logout = async () => {
    await awLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
