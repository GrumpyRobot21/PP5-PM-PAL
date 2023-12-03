import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import axios from 'axios';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    telephone: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    telephone: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [touchedFields, setTouchedFields] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        console.error('User ID or token is missing');
        navigate('/login'); // Replace with your login route
        return;
      }

      const userProfileEndpoint = `http://127.0.0.1:8000/api/user-profile/${userId}/`;

      axios.get(userProfileEndpoint, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then(response => {
          setFormData({
            ...formData,
            name: response.data.user.name,
            telephone: response.data.user.telephone,
            email: response.data.user.email,
            username: response.data.user.username,
          });
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
          // Handle errors appropriately
        });
    };

    fetchUserProfile();
  }, []);

  const handleBlur = (field) => {
    setTouchedFields({ ...touchedFields, [field]: true });
  };


  const validateForm = () => {
    let valid = true;

    const updatedErrors = {
      name: '',
      telephone: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    };

    if (formData.name.trim() === '' || !/^[a-zA-Z ]+$/.test(formData.name)) {
      updatedErrors.name = 'Name can only contain letters and spaces.';
      valid = false;
    }

    if (formData.telephone.trim() === '' || !/^\d+$/.test(formData.telephone)) {
      updatedErrors.telephone = 'Telephone number can only contain numbers.';
      valid = false;
    }

    if (formData.email.trim() === '' || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      updatedErrors.email = 'Please enter a valid email address.';
      valid = false;
    }

    if (formData.password.length < 8 || !/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[!@#$%^&*]/.test(formData.password)) {
      updatedErrors.password = 'Password must be at least 8 characters long and include a number, a special character, and an uppercase letter.';
      valid = false;
    }

    if (formData.confirmPassword !== formData.password) {
      updatedErrors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }

    setFormErrors(updatedErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Mark the field as touched
    setTouchedFields({ ...touchedFields, [name]: true });

    // Validate the specific field and update the error message
    const updatedErrors = { ...formErrors };

    if (name === 'name') {
      updatedErrors.name = (value.trim() === '' || !/^[a-zA-Z ]+$/.test(value))
        ? 'Name can only contain letters and spaces.'
        : '';
    } else if (name === 'telephone') {
      updatedErrors.telephone = (value.trim() === '' || !/^\d+$/.test(value))
        ? 'Telephone number can only contain numbers.'
        : '';
    } else if (name === 'email') {
      updatedErrors.email = (value.trim() === '' || !/^\S+@\S+\.\S+$/.test(value))
        ? 'Please enter a valid email address.'
        : '';
    } else if (name === 'password') {
      updatedErrors.password = (value.length < 8 || !/[A-Z]/.test(value) || !/[0-9]/.test(value) || !/[!@#$%^&*]/.test(value))
        ? 'Password must be at least 8 characters long and include a number, a special character, and an uppercase letter.'
        : '';
    } else if (name === 'confirmPassword') {
      updatedErrors.confirmPassword = (value !== formData.password)
        ? 'Passwords do not match.'
        : '';
    }

    setFormErrors(updatedErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleUpdateProfile();
    }
  };

  const handleUpdateProfile = () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      console.error('User ID or token is missing');
      navigate('/login'); // Replace with your login route
      return;
    }

    const updateProfileEndpoint = `http://127.0.0.1:8000/api/update_profile/`;
    // const updateProfileEndpoint = `http://127.0.0.1:8000/api/users/${userId}/profile/`;



    // Prepare the data for updating (excluding confirmPassword)
    const updateData = {
      name: formData.name,
      telephone: formData.telephone,
      email: formData.email,
      username: formData.username,
      // Include password only if it's set and valid
      ...(formData.password && { password: formData.password }),
    };

    // Make a PUT request to update the user's profile
    axios.put(updateProfileEndpoint, updateData, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then(response => {
        console.log('Profile updated successfully:', response.data);
        navigate('/tasks'); // Redirect or perform other actions post-update
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        // Handle error
      });
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  return (
    <div className="profile-page">
      <h1 className="pm-pal-text styled-title">PM-PAL</h1>
      <div className="central-content">
        <h2 className="title">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">
              Name:
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                value={formData.name}
                className="profile-input"
              />
            </label>
            {formErrors.name && <div className="error-text">{formErrors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="telephone">
              Telephone Number:
              <input
                type="text"
                id="telephone"
                name="telephone"
                onChange={handleChange}
                onBlur={() => handleBlur('telephone')}
                value={formData.telephone}
                className="profile-input"
              />
            </label>
            {formErrors.telephone && <div className="error-text">{formErrors.telephone}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email Address:
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                value={formData.email}
                className="profile-input"
              />
            </label>
            {formErrors.email && <div className="error-text">{formErrors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="username">
              Username:
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                onBlur={() => handleBlur('username')}
                value={formData.username}
                className="profile-input"
              />
            </label>
            {formErrors.username && <div className="error-text">{formErrors.username}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                value={formData.password}
                className="profile-input"
              />
            </label>
            {formErrors.password && <div className="error-text">{formErrors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password:
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={() => handleBlur('confirmPassword')}
                value={formData.confirmPassword}
                className="profile-input"
              />
            </label>
            {formErrors.confirmPassword && <div className="error-text">{formErrors.confirmPassword}</div>}
          </div>

          <div className="button-group">
            <button type="submit" className="confirm-profile-button">
              Update Profile
            </button>
            <button type="button" className="cancel-profile-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
