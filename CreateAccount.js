import React, { useState } from 'react';
import logo from './GatorGoalMateLogo.png'; 
import './CreateAccount.css'; 
const UserProfile = require('./models/userProfile');

function CreateAccount() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const newUserProfile = new UserProfile({
      username: username,
      email: email,
      password: password,
      // Add other fields as necessary
    });
  
    // Save the User Profile
    newUserProfile.save((err) => {
      if (err) throw err;
      console.log('User profile saved successfully!');
    });
  
    console.log(username, email, password, confirmPassword);
    // send user information , perform async op in backend server
  }
  

  return (
    <div className="container">
      <img src={logo} alt="GatorGoalMate Logo" className="logo" />
      <div className="form-wrapper">
        <h2>Create Your Account</h2>
        <form id="accountForm" onSubmit={handleSubmit}>
          <input
            type="text"
            id="firstname"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            id="lastname"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            id="email"
            placeholder="Email (must end with .ufl.edu)"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            id="username"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="btn">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
