// AuthWrapper.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const AuthWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        navigate('/login');
        return;
      }

      try {
        // Attempt to decode the JWT to check validity
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          // Token has expired
          localStorage.removeItem('userName');
          localStorage.removeItem('token');
          localStorage.removeItem('email');

          setIsAuthenticated(false);
          setIsLoading(false);
          navigate('/login');
        } else {
          setIsAuthenticated(true);
          setIsLoading(false);
        }
      } catch (error) {
        localStorage.removeItem('userName');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setIsAuthenticated(false);
        setIsLoading(false);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while checking auth
  }

  return <Outlet />;
};

export default AuthWrapper;