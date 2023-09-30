import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="container title-container">
        <h1 className="title">PM-PAL</h1>
        <div className="buttons">
          <Link to="/create-profile" className="buttons create-profile-button">
            Create Profile
          </Link>
          <button className="login-button">Login</button>
        </div>
      </div>
      <div className="container title-container"> {/* Use the same class as above */}
        <p className="welcome-text">
          Welcome to "PM-PAL," the app to meet all of your task management and organisational needs.
          Please create a profile. Once this is completed, you will be able to login and start fully realising
          that organised life you've been waiting for!
        </p>
      </div>
    </div>
  );
};

export default HomePage;
