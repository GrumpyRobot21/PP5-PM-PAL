import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleLoginForm = () => {
    setIsLoginFormVisible((prev) => !prev);
  };

  const handleLogin = () => {
    // Simulate a successful login
    setIsLoggedIn(true);
    navigate('/tasks');
  };

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
          <form className="login-form">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" className="login-input" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Redirect to TaskPage if isLoggedIn is true */}
      {isLoggedIn && navigate('/tasks')}
    </div>
  );
};

export default HomePage;
