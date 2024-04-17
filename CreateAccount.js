import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './GatorGoalMateLogo.png';
import './CreateAccount.css';

function CreateAccount() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return email.endsWith("@ufl.edu");
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let tempErrors = {};

    if (!validateEmail(formFields.email)) {
      tempErrors.email = 'Email must end with "@ufl.edu"';
    }

    if (!validatePassword(formFields.password)) {
      tempErrors.password = "Password must contain one capital letter, one lowercase letter, one number, one special character and be at least 8 characters long";
    }

    if (!passwordsMatch(formFields.password, formFields.confirmPassword)) {
      tempErrors.confirmPassword = "Passwords do not match!";
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      console.log('Form data:', formFields);
      navigate("/main");
    }
  };

  const handleFieldChange = (fieldName, value) => {
    setFormFields({ ...formFields, [fieldName]: value });
    setErrors({ ...errors, [fieldName]: '' });
  };

  return (
    <div className="container">
      <img src={logo} alt="GatorGoalMate Logo" className="logo" />
      <div className="form-wrapper">
        <h2>Create Your Account</h2>
        <form id="accountForm" onSubmit={handleSubmit}>
          {Object.keys(formFields).map((key) => (
            key !== 'confirmPassword' && (
              <React.Fragment key={key}>
                <input
                  type={key.includes("password") ? "password" : "text"}
                  id={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                  required
                  value={formFields[key]}
                  onChange={(e) => handleFieldChange(key, e.target.value)}
                  className={errors[key] ? 'error' : ''}
                />
                {errors[key] && <div className="error-message">{errors[key]}</div>}
              </React.Fragment>
            )
          ))}
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            required
            value={formFields.confirmPassword}
            onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          <button type="submit" className="btn">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
