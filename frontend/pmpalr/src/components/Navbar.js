import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        {/* Add more navigation items as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
