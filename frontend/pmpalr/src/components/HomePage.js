import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

  const toggleLoginForm = () => {
    setIsLoginFormVisible((prev) => !prev);
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
          Welcome to "PM-PAL," the app to meet all of your task management and organizational needs.
          Please create a profile. Once this is completed, you will be able to log in and start fully realizing
          that organized life you've been waiting for!
        </p>
      </div>

      {/* Conditionally render the login form based on isLoginFormVisible */}
      {isLoginFormVisible && (
        <div className="login-form-container">
          <form className="login-form">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default HomePage;
