import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { Link } from 'react-router-dom';
import './ProfilePage.css';
import logo from './GatorGoalMateLogo.png';

function ProfilePage() {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [isEditing, setIsEditing] = useState({ firstName: false, lastName: false, password: false });
  const [values, setValues] = useState({
    firstName: 'John',
    lastName: 'Doe',
    password: ''
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // A state to track if any changes have been made
  const [changesMade, setChangesMade] = useState(false);

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
    setChangesMade(true); // Set changesMade to true when editing begins
  };

  const handleChange = (field, event) => {
    setValues({ ...values, [field]: event.target.value });
  };

  const handleSave = () => {
    console.log("Saving data:", values);
    // Here you will integrate the API to update the data
    setIsEditing({ firstName: false, lastName: false, password: false });
    setChangesMade(false); // Reset changesMade to false after saving
  };

  const handleDelete = () => {
    navigate('/home'); // Navigate to HomePage after deletion
  };

  return (
    <div className="profile-page">
      <img src={logo} alt="GatorGoalMate Logo" className="profile-logo" />
      <div className="profile-header">
        <h2>Profile Information</h2>
        <Link to="/" className="homepage-link">Home Page</Link>
        <Link to="/main-page" className="mainpage-link">Main Page</Link>
      </div>

      {['firstName', 'lastName'].map((field) => (
        <div className="profile-detail" key={field}>
          <label>{field === 'firstName' ? 'First Name:' : 'Last Name:'}</label>
          {isEditing[field] ? (
            <input
              type="text"
              value={values[field]}
              onChange={(e) => handleChange(field, e)}
            />
          ) : (
            <span>{values[field]}</span>
          )}
          <button className="edit-button" onClick={() => handleEdit(field)}>Edit</button>
        </div>
      ))}

      <div className="profile-detail">
        <label>Password:</label>
        {isEditing.password ? (
          <input
            type="password"
            value={values.password}
            onChange={(e) => handleChange('password', e)}
          />
        ) : (
          <button className="edit-button" onClick={() => handleEdit('password')}>Change Password</button>
        )}
      </div>

      {changesMade && (
        <button className="save-button" onClick={handleSave}>Save Changes</button>
      )}

      <div className="profile-actions">
        <button className="action-button" onClick={() => setShowDeleteModal(true)}>Delete Account</button>
      </div>

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete your account?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setShowDeleteModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
