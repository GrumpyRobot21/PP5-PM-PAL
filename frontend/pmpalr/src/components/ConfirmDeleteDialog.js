import React from 'react';
import './ConfirmDeleteDialog.css';

const ConfirmDeleteDialog = ({ onCancel, onConfirm }) => {
  return (
    <div className="confirm-delete-dialog">
      <div className="dialog-content">
        <p>Are you sure you want to delete this task?</p>
        <div className="button-container">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDialog;