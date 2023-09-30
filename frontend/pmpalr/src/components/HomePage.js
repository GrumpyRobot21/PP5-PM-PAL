import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="container title-container">
        <h1 className="title">PM-PAL</h1>
        <div className="buttons">
          <button className="create-profile-button">Create Profile</button>
          <button className="login-button">Login</button>
        </div>
      </div>
      <div className="container title-container"> {/* Use the same class as above */}
        <p className="welcome-text">
          Welcome to "PM-PAL," the app to meet all of your task management and organizational needs.
          Please create a profile. Once this is completed, you will be able to login and start fully realizing
          that organized life you've been waiting for!
        </p>
      </div>
    </div>
  );
};

export default HomePage;
