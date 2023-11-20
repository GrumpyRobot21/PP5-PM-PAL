import React, { useState, useEffect } from 'react'; // Import useEffect here
import { Link, useNavigate } from 'react-router-dom'; // Ensure Link is imported
import './HomePage.css';
import ErrorModal from './ErrorModal';
import axios from 'axios';

const HomePage = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const navigate = useNavigate();

  const toggleLoginForm = () => {
    setIsLoginFormVisible(prev => !prev);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username: formData.username,
        password: formData.password
      });

      localStorage.setItem('token', response.data.token);
      // Example: assuming response contains the user ID as 'user_id'
      localStorage.setItem('userId', response.data.user_id);

      setIsLoggedIn(true); // Update login state
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Invalid username or password.');
      setIsErrorModalVisible(true); // Activate the error modal
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/tasks'); // Redirect upon successful login
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="home-page">
      <div className="container title-container">
        <h1 className="title">PM-PAL</h1>
        <div className="buttons">
          <Link to="/create-profile" className="buttons create-profile-button">
            Create Profile
          </Link>
          <button className="login-button" onClick={toggleLoginForm}>
            Login
          </button>
        </div>
      </div>
      <div className="container title-container">
        <p className="welcome-text">
          Welcome to "PM-PAL," the app to meet all of your task management and organisational needs.
          Please create a profile. Once completed, you will be able to log in and start fully realising
          the organised life you've been waiting for!
        </p>
      </div>

      {/* Conditionally render the login form based on isLoginFormVisible */}
      {isLoginFormVisible && (
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" className="login-input" value={formData.username} onChange={handleChange} />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />


            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      )}

      {isErrorModalVisible && (
        <ErrorModal errorMessage={errorMessage} closeModal={() => setIsErrorModalVisible(false)} />
      )}
    </div>
  );
};

export default HomePage;


