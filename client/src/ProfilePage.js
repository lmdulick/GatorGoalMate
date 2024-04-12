import React from 'react';
import { Link } from 'react-router-dom';
import './ProfilePage.css'; 

function ProfilePage() {
  // back/end
  const userData = {
    name: 'John Doe',
    password: '********' 
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>User Profile</h2>
        <Link to="/" className="homepage-link">Home Page</Link>
        <Link to="/main-page" className="mainpage-link">Main Page</Link>
      </div>
      <div className="profile-detail">
        <label>Name:</label>
        <span>{userData.name}</span>
      </div>
      <div className="profile-detail">
        <label>Password:</label>
        <span>{userData.password}</span> {/*check */}
      </div>
      <div className="profile-actions">
        {/* Placeholder  */}
        <button className="action-button">Edit Profile</button>
        <button className="action-button">Change Password</button>
      </div>
    </div>
  );
}

export default ProfilePage;