import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './ProfilePage.css';
import logo from './GatorGoalMateLogo.png';

function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state.username;

  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    username: false,
    password: false,
  });

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    username: username,
    password: '********',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [changesMade, setChangesMade] = useState(false);

  // search through 'Collection-Profile' to find the profile with the given username
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/profile', { mode: 'cors' });
        if (!response.ok) {
          throw new Error('Failed to fetch profiles');
        }
        const profiles = await response.json();
        const foundProfile = profiles.find(profile => profile.username === username);
        setProfile(foundProfile);
      } catch (error) {
        console.error('Error fetching profile:', error.message);
      }
    };

    fetchProfile();
  }, [username]);

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
    setChangesMade(true);
  };

  const handleChange = (field, event) => {
    setValues({ ...values, [field]: event.target.value });
  };

  // EDIT a user's profile --- function still in progress
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/profile/${profile._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      setChangesMade(false);
      setIsEditing({
        firstName: false,
        lastName: false,
        username: false,
        password: false,
      });
    } catch (error) {
      console.error('Error saving changes:', error.message);
    }
  };

  // DELETE a user's profile after clicking 'Delete Account' button
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/profile/${profile._id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }
  
      // Redirect to the opening page after successful deletion
      navigate('/');
    } catch (error) {
      console.error('Error deleting profile:', error.message);
    }
  };

  return (
    <div className="profile-page">
      
        <button className="sidebar-button">
          <Link to="/main-page" state={{ username }}>
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>
         </button>

         <div className="profile-header">Profile Information</div>


      {profile && ['firstName', 'lastName', 'username'].map((field) => (
        <div className="profile-detail" key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1).replace('Name', ' name') + ':'}</label>
          {isEditing[field] ? (
            <input
              type="text"
              value={values[field]}
              onChange={(e) => handleChange(field, e)}
            />
          ) : (
            <span>{profile[field]}</span>
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
          <span>{values.password}</span>
        )}
        <button className="edit-button" onClick={() => handleEdit('password')}>
          {isEditing.password ? 'Save' : 'Edit'}
        </button>
      </div>

      {changesMade && (
        <button className="save-button" onClick={handleSave}>Save Changes</button>
      )}

      <div className="profile-actions">
      <Link to="/" className="button">Logout</Link>
        <button className="button" onClick={() => setShowDeleteModal(true)}>Delete Account</button>
      </div>

      {showDeleteModal && (
        <div className="delete-pop-up">
          <div className="delete-content">
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
