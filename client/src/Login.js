import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './GatorGoalMateLogo.png'; 
import './Login.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Logging in', { username, password });
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <img src={logo} alt="GatorGoalMate Logo" className="login-logo" />
        <form onSubmit={handleLogin} className="login-form">
          <h2 className="login-title">Login</h2>
          <Link to="/" className="homepage-link">Home</Link>
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
              type="password"
              id="password"
              className="login-input"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
          <div className="login-additional-options">
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;