import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const USERS_KEY = "skymart_users";
const SESSION_KEY = "skymart_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem(SESSION_KEY)) || null
  );

  const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  const register = (name, email, password) => {
    const users = getUsers();

    const alreadyExists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (alreadyExists) {
      throw new Error("An account with this email already exists.");
    }

    const newUser = { name, email, password };
    const updatedUsers = [...users, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

    // auto-login after register (don't store password in session)
    const sessionUser = { name, email };
    setUser(sessionUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

    return sessionUser;
  };

  const login = (email, password) => {
    const users = getUsers();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!found) {
      throw new Error("Invalid email or password.");
    }

    const sessionUser = { name: found.name, email: found.email };
    setUser(sessionUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

    return sessionUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);