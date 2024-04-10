import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css'; // Ensure this path is correct

function MainPage() {
  return (
    <div className="main-page">
      <h1>Welcome to GatorGoalMate</h1>
      <Link to="/profile" className="profile-link">Go to Profile</Link>
      {/* Add more navigation or content as needed */}
    </div>
  );
}

export default MainPage;
