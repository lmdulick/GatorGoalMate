import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MainPage from './MainPage';
import './ProfilePage.css';
import logo from './GatorGoalMateLogo.png';


function ProfilePage() {
  const navigate = useNavigate();

  // const [username, setUsername] = useState('');
  const location = useLocation();
  const username = location.state.username;


  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    username: false,
    password: false,
  });

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [changesMade, setChangesMade] = useState(false);

  console.log("profile username: ", username);

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
    setChangesMade(true);
  };

  const handleChange = (field, event) => {
    setValues({ ...values, [field]: event.target.value });
  };

  const handleSave = () => {
    console.log('Saving data:', values);
    setIsEditing({ firstName: false, lastName: false, username: false, password: false });
    setChangesMade(false);
  };

  const handleDelete = () => {
    navigate('/');
  };

  return (
    <div className="profile-page">
      <img src={logo} alt="GatorGoalMate Logo" className="profile-logo" />
      <div className="profile-header">
        Profile Information
        <Link to="/" className="homepage-link">Home</Link>
        <Link to="/main-page" state={{ username }} className="mainpage-link">Main Screen</Link>
      </div>

      {['firstName', 'lastName', 'username'].map((field) => (
        <div className="profile-detail" key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1).replace('Name', ' name') + ':'}</label>
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