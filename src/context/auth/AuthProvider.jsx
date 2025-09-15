  import { useState, useEffect } from "react";
  import { AuthContext } from "./AuthContext";

  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

useEffect(() => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (token && storedUser) {
    setIsAuthenticated(true);
    setUser(JSON.parse(storedUser));
  }

  setIsAuthLoading(false);
}, []);

    const login = (userData) => {
      const { access_token, ...userInfo } = userData;
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(userInfo));
      setUser(userInfo);

      setIsAuthenticated(true);
    };

    const logout = () => {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    };

    return (
      <AuthContext.Provider
        value={{ user, isAuthenticated, isAuthLoading, login, logout }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
