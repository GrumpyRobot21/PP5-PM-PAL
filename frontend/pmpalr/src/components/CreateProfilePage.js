import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProfilePage.css';

const CreateProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    telephone: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();  // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Navigate to the home page after form submission
    navigate('/');
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

          {/* Adjusted the width for the telephone field */}
          <label htmlFor="telephone">Telephone Number:</label>
          <input type="text" id="telephone" name="telephone" onChange={handleChange} value={formData.telephone} />

          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} />

          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" onChange={handleChange} value={formData.username} />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" onChange={handleChange} value={formData.password} />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} />

          <button type="submit" className="save-confirm-button">Save and Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfilePage;
