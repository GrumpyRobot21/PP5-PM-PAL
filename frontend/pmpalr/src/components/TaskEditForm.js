import React, { useState } from 'react';
import './TaskEditForm.css';

const TaskEditForm = ({ task, onUpdateTask, onCloseEdit }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditedTask({ ...editedTask, file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateTask(editedTask);
    onCloseEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={editedTask.title}
        onChange={handleChange}
        className="task-input"
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={editedTask.description}
        onChange={handleChange}
        className="task-input"
      />
      <input
        type="date"
        name="dueDate"
        value={editedTask.dueDate}
        onChange={handleChange}
        className="task-input"
      />

      <div className="status-dropdown">
        <label htmlFor="status" className="status-label">Edit Status:</label>
        <select name="status" value={editedTask.status} onChange={handleChange} className="status-select">
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Expired">Expired</option>
        </select>
      </div>

      <input type="file" name="file" onChange={handleFileChange} />

      {/* Updated styling for the buttons */}
      <div className="update-cancel-buttons">
        <button type="submit" className="task-button">Update Task</button>
        <button onClick={onCloseEdit} className="task-button">Cancel</button>
      </div>

    </form>
  );
};

export default TaskEditForm;
