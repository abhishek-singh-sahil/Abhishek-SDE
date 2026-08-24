import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../lib/api';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const adminToken = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

      try {
        if (token) {
          const data = await apiFetch('/auth/me');
          if (data.success && data.user) {
            setUser(data.user);
          } else {
            localStorage.removeItem('token');
          }
        }
      } catch (err) {
        localStorage.removeItem('token');
      }

      try {
        if (adminToken) {
          const data = await apiFetch('/auth/admin/me');
          if (data.success && data.admin) {
            setAdmin(data.admin);
          } else {
            localStorage.removeItem('adminToken');
          }
        }
      } catch (err) {
        localStorage.removeItem('adminToken');
      }

      setLoading(false);
    }

    checkAuth();
  }, []);

  const loginUserWithToken = async (idToken) => {
    setLoading(true);
    try {
      const data = await apiFetch('/auth/google', {
        method: 'POST',
        body: JSON.stringify({ idToken }),
      });
      if (data.success && data.user) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
      }
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const mockLoginUser = async (name, email) => {
    const mockPayload = JSON.stringify({ name, email, avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${name}` });
    await loginUserWithToken(mockPayload);
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (data.success && data.user) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
      }
    } catch (error) {
      console.error('Email login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (name, email, password) => {
    setLoading(true);
    try {
      const data = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      if (data.success && data.user) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginAdmin = async (email, password) => {
    setLoading(true);
    try {
      const data = await apiFetch('/auth/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (data.success && data.admin) {
        localStorage.setItem('adminToken', data.token);
        setAdmin(data.admin);
      }
    } catch (error) {
      console.error('Admin login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch (e) {}
    localStorage.removeItem('token');
    setUser(null);
  };

  const logoutAdmin = async () => {
    try {
      await apiFetch('/auth/admin/logout', { method: 'POST' });
    } catch (e) {}
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        loading,
        loginUserWithToken,
        mockLoginUser,
        loginUser,
        registerUser,
        loginAdmin,
        logoutUser,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
