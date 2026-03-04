import { createContext, useState, useEffect, useContext } from 'react';
import API from '../api/axios.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        try {
          
          // Localhost URL ko API instance se replace kar diya
          const response = await API.get("/api/tasks/all", {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });

          // Axios mein agar status 200 na ho to wo khud error throw karta hai
          setUser(JSON.parse(storedUser));
          setToken(storedToken);

        } catch (error) {
          
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setUser(null);
          setToken(null);
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = (userData, jwtToken) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', jwtToken);

    setUser(userData);
    setToken(jwtToken);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);