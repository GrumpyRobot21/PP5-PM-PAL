import React from 'react';
import './ErrorModal.css';

const ErrorModal = ({ errorMessage, closeModal }) => {
  return (
    <div className="error-modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorModal;