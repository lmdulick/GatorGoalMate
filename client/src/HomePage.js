import React from 'react';
import { Link } from 'react-router-dom';
import logo from './GatorGoalMateLogo.png'; 
import './HomePage.css'; 

const HomePage = () => {
    return (
        <div className="home-container">
            <img src={logo} alt="GatorGoalMate Logo" className="home-logo" />
            <h1>Welcome to GatorGoalMate</h1>
            <div className="navigation-buttons">
                <Link to="/login">
                    <button className="navigation-button">Login</button>
                </Link>
                <Link to="/create-account">
                    <button className="navigation-button">Create Account</button>
                </Link>
            </div>
            {/* Rest */}
        </div>
    );
};

export default HomePage;



//base test code for button swithcing/function (works 04/04/24)
/*
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to GatorGoalMate</h1>
      <div className="navigation-buttons">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/create-account">
          <button>Create Account</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
*/