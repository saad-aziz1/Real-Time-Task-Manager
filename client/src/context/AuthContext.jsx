import { createContext, useState, useEffect, useContext } from 'react';

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
          
          const response = await fetch(
            "http://localhost:10000/api/tasks/all",
            {
              headers: {
                Authorization: `Bearer ${storedToken}`
              }
            }
          );

          if (!response.ok) {
            throw new Error("Token invalid");
          }

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