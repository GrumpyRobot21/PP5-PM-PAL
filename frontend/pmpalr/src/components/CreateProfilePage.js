import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProfilePage.css';
import axios from 'axios';

const CreateProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    telephone: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState(''); // New state for server messages

  const navigate = useNavigate();  // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate input based on name
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: validateInput(name, value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    for (const field in formData) {
      newErrors[field] = validateInput(field, formData[field]);
    }

    const hasErrors = Object.values(newErrors).some(error => !!error);

    if (hasErrors) {
      setErrors(newErrors);
    } else {
      try {
        // Make sure to replace this URL with your production API endpoint
        const response = await axios.post('https://your-api-domain.com/api/register/', formData);

        // Set a success message and navigate to a different page if needed
        setServerMessage('Registration successful!');
        console.log('Registration successful!', response.data); // Consider removing this log in production
        navigate('/'); // Adjust the navigation path as needed
      } catch (error) {
        // Extract and display error message from the server response
        const errorMessage = error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : 'An unknown error occurred';
        setServerMessage('Error during registration: ' + errorMessage);
        console.error('Error during registration:', error); // Consider removing or adjusting this log in production
      }
    }
  };


  const validateInput = (name, value) => {
    switch (name) {
      case 'name':
        return value.match(/^[a-zA-Z ]+$/) ? '' : 'Name can only contain letters and spaces.';
      case 'telephone':
        return value.match(/^[0-9]+$/) ? '' : 'Telephone can only contain numerical characters.';
      case 'email':
        return value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) ? '' : 'Invalid email format.';
      case 'username':
        return value.trim() ? '' : 'Username cannot be empty.';
      case 'password':
        return value.length >= 8 && /\d/.test(value) && /[!@#$%^&*]/.test(value) && /[A-Z]/.test(value) ? '' : 'Password must be at least 8 characters long and include a number, a special character, and an uppercase letter.';
      case 'confirmPassword':
        return value === formData.password ? '' : 'Passwords do not match.';
      default:
        return '';
    }
  };

  const renderError = (field) => {
    const error = errors[field];
    return error ? <div className="error-message">{error}</div> : null;
  };

  return (
    <div className="create-profile-page">
      <div className="pm-pal-text">PM-PAL</div>
      <div className="navbar">
        <button className="home-button"><a href="/">Home</a></button>
      </div>
      <div className="central-content">
        <h2 className="title">Create Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" onChange={handleChange} value={formData.name} />
          {renderError('name')}

          <label htmlFor="telephone">Telephone Number:</label>
          <input type="text" id="telephone" name="telephone" onChange={handleChange} value={formData.telephone} />
          {renderError('telephone')}

          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} />
          {renderError('email')}

          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" onChange={handleChange} value={formData.username} />
          {renderError('username')}

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" onChange={handleChange} value={formData.password} />
          {renderError('password')}

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} />
          {renderError('confirmPassword')}

          <button type="submit" className="save-confirm-button">Save and Confirm</button>
        </form>
        {serverMessage && <div className="server-message">{serverMessage}</div>} {/* Display server message */}
      </div>
    </div>
  );
};

export default CreateProfilePage;
