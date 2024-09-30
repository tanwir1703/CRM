import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: formData.email,
        password: formData.password
      });
      console.log(response);
      if (response.status === 200) {
        const { token, name, email } = response.data;
        localStorage.setItem('token', token);   // Save token
        localStorage.setItem('userName', name); // Save user name
        localStorage.setItem('EmailID', email);
        window.location.href = '/';  // Redirect to home page
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3001/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token in local storage
      window.location.href = '/'; // Redirect to Home page
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="flex-1 bg-gray-100 p-10 flex flex-col justify-center items-center">
        <img
          src="earth-home.jpg"
          alt="Welcome"
          className="w-full max-w-md mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">Welcome to CPM</h1>
        <p>Your one stop solution to create a positive impact.</p>
      </div>

      {/* Right Side */}
      <div className="flex-1 p-10 flex flex-col justify-center">
        <div className="mb-4">
          <button
            onClick={() => setIsRegistering(false)}
            className={`px-4 py-2 ${!isRegistering ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded`}
          >
            Log In
          </button>
          <button
            onClick={() => setIsRegistering(true)}
            className={`px-4 py-2 ${isRegistering ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded`}
          >
            Sign Up
          </button>
        </div>

        {isRegistering ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleRegister}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Register
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Log In</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;