import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    telephone: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateProfile = () => {
    // Update profile data logic here

    // Navigate back to the task page
    navigate('/tasks');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="profile-page">
      <h1 className="pm-pal-text styled-title">PM-PAL</h1>

      <div className="central-content">
        <h2 className="title">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="profile-form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            className="profile-input"
          />

          <label htmlFor="telephone">Telephone Number:</label>
          <input
            type="text"
            name="telephone"
            onChange={handleChange}
            value={formData.telephone}
            className="profile-input"
          />

          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="profile-input"
          />

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
            className="profile-input"
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="profile-input"
          />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            className="profile-input"
          />

          <button
            type="button"
            onClick={handleUpdateProfile}
            className="confirm-profile-button"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
