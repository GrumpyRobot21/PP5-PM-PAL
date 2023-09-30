import React from 'react';
import './Button.css'; // Make sure to create this CSS file

const Button = ({ text }) => {
  return <button className="custom-button">{text}</button>;
};

export default Button;
