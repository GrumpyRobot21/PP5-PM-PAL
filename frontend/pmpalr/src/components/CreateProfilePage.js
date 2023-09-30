import React, { useState } from 'react';

const CreateProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    telephone: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API call to register the user
    console.log('Form submitted:', formData);
  };

  return (
    <div className="create-profile-page">
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" onChange={handleChange} value={formData.name} />

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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateProfilePage;
