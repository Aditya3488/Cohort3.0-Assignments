import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance, { setAccessToken } from "../api/axiosInstance";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data } = await axiosInstance.post("/auth/refresh-token");
        setAccessToken(data.accessToken);

        const meRes = await axiosInstance.get("/auth/me");
        setUser(meRes.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email, password) => {
    const { data } = await axiosInstance.post("/auth/login", { email, password });
    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  const register = async (formData) => {
    await axiosInstance.post("/auth/register", formData);
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error(error);
    }
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);