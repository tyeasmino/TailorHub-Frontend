import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/accounts/user_details/', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      setUser(res.data);
      
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/accounts/login/",
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        fetchUserDetails(res.data.token);
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
