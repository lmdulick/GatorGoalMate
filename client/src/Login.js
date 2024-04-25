import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MainPage from './MainPage';
import logo from './GatorGoalMateLogo.png'; 
import './Login.css'; 


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      console.log('Login response:', data);
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }
  
      if (data.user) {
        console.log('Login successful:', data.user);
        navigate("/main-page", {state : {username}});
      } else {
        console.error('User data not found in response');
        setErrorMessage('Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <img src={logo} alt="GatorGoalMate Logo" className="login-logo" />
        <form onSubmit={handleLogin} className="login-form">
          <h2 className="login-title">Login</h2>
          <Link to="/" className="homepage-link">Back</Link>
          <div className="login-input-group">
            <input
              type="text"
              id="username"
              className="login-input"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="login-input"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="login-btn">Login</button>
          <div className="login-additional-options">
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;