import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MainPage from './MainPage';
import logo from './GatorGoalMateLogo.png'; 
import './CreateAccount.css'; 


function CreateAccount() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(''); // State for email error message


  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/profile', { mode: 'cors' });
      const data = await response.json();

      // Only set state values if data.user is defined
    if (data.user) {
      setFirstName(data.user);
      setLastName(data.user);
      setEmail(data.user);
      setUsername(data.user);
      setPassword(data.user);
    }
    setLoading(false);
    } 
    catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    return email.endsWith("@ufl.edu");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Reset the email error state each time the form is submitted
    setEmailError('');

    // Check if the email ends with "@ufl.edu"
    if (!validateEmail(email)) {
      setEmailError('Email must end with "@ufl.edu"');
      return; // Stop form submission if the email is invalid
    }
  
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      // set an error state to display a message to the user
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          password
        })
      });
  
      if (response.ok) {
        console.log("Account created successfully");
        navigate("/main-page", {state : {username}});
        //console.log("username: ", username);
        // Optionally, you can redirect the user to another page or show a success message
      } else {
        console.error("Failed to create account");
        // Optionally, you can set an error state to display a message to the user
      }
    } catch (error) {
      console.error('Error creating account:', error);
      // Optionally, you can set an error state to display a message to the user
    }
    //console.log(firstName, lastName, email, username, password, confirmPassword);
    
    // After form submission logic (e.g., after successful account creation), navigate to MainPage
    //navigate("/main-page"); // Use the path you've assigned to MainPage in your routing setup
  };

  useEffect(() => {
    makeAPICall();
  }, []);

  return (
    <div className="container">
      <img src={logo} alt="GatorGoalMate Logo" className="logo" />
      <div className="form-wrapper">
        <h2>Create Your Account</h2>
        <Link to="/" className="homepage-link">Home</Link>
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
            placeholder="Email (must end with @ufl.edu)"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="error-message">{emailError}</div>}
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