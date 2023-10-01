import React from 'react';

const TaskDetails = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="task-details">
      <h2>{task.title}</h2>
      <p>Description: {task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {task.dueDate}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TaskDetails;
