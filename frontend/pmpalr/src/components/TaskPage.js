import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import './TaskPage.css';
import TaskEditForm from './TaskEditForm';
import TaskDetails from './TaskDetails';
import ProfilePage from './ProfilePage';

const formatDate = (date) => {
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const TaskPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({ title: '', details: '', completion_date: '', status: 'Open' });
  const [showCreateTaskFields, setShowCreateTaskFields] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const handleLogout = () => {
    // Perform any necessary actions to clear user credentials or authentication state
    // For simplicity just navigating back to the homepage
    navigate('/');
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTaskData({ ...taskData, file });
  };

  const handleEditProfile = () => {
    // Navigate to the profile edit page
    navigate('/profile');
  };

  const handleTaskClick = (task) => {
    setSelectedTask((prevSelectedTask) => {
      return prevSelectedTask === task ? null : task;
    });
  };

  const statusOptions = ['Open', 'In Progress', 'Completed', 'Expired'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleTaskEdit = (taskId) => {
    setEditingTaskId(taskId);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTaskId(null); // Stop editing after updating
  };



  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const newTask = { ...taskData, id: Math.random().toString() };
    setTasks([...tasks, newTask]);
    setTaskData({ user: localStorage.getItem('userId'), title: '', details: '', completion_date: '', status: 'Open' });
    setShowCreateTaskFields(false); // Close the form after submission
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      console.error('User ID or token is missing');
      navigate('/login'); // Replace with your login route
      return;
    }
    const createtaskEndpoint = `http://127.0.0.1:8000/api/create_task/`;

    console.log('task data', taskData)
    axios.post(createtaskEndpoint, taskData, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then(response => {
        console.log('Task created successfully:', response.data);
        navigate('/tasks'); // Redirect or perform other actions post-update
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        // Handle error
      });
  };

  const handleTaskDelete = (taskId) => {
    setDeleteTaskId(taskId);
  };

  const handleConfirmDelete = () => {
    setTasks(tasks.filter((task) => task.id !== deleteTaskId));
    setDeleteTaskId(null);
  };

  const handleCancelDelete = () => {
    setDeleteTaskId(null);
  };

  return (
    <div className="task-page">
      <h1 className="pm-pal-title styled-title">PM-PAL</h1>

      <div className="top-right-buttons">
        <button className="edit-profile-button" onClick={handleEditProfile}>
          Edit Profile
        </button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="task-container">
        <button
          className="confirm-task-button"
          onClick={() => setShowCreateTaskFields((prev) => !prev)}
        >
          Create Task
        </button>

        {showCreateTaskFields && (
          <form onSubmit={handleTaskSubmit} className="task-form">
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={taskData.title}
              onChange={handleChange}
            />
            <textarea
              name="details"
              placeholder="Task Description"
              value={taskData.details}
              onChange={handleChange}
            />
            <input
              type="date"
              name="completion_date"
              value={taskData.completion_date}
              onChange={handleChange}
            />

            {/* Status dropdown */}
            <div className="status-dropdown">
              <label htmlFor="status">Status:</label>
              <select name="status" id="status" value={taskData.status} onChange={handleChange}>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            {/* File input for uploading files */}
            <input type="file" onChange={handleFileChange} />

            <button type="submit" className='confirm-task-button'>Confirm Task</button>
          </form>
        )}

        {/* Task List Headings */}
        <div className="task-list-headings">
          <div>Title</div>
          <div>Status</div>
          <div>Due Date</div>
          <div>Actions</div>
        </div>

        {/* Task Search */}
        <div className="task-search">
          <input
            type="text"
            placeholder="Search by title, due date, status"
            className="search-input"
          />
          <button className="search-button">Search Tasks</button>
        </div>

        <div className="instruction-text">
          Click on a task to view/hide details.
        </div>

        {/* Task List */}
        {tasks.map((task) => (
          <div key={task.id} className="task-item" onClick={() => handleTaskClick(task)}>
            {/* Title */}
            <div className="task-info">{task.title}</div>

            {/* Status */}
            <div className="task-info">{task.status}</div>

            {/* Due Date */}
            <div className="task-info">{formatDate(task.dueDate)}</div>

            {/* Actions */}
            <div className="task-actions">
              <FaEdit className="action-icon" onClick={() => handleTaskEdit(task.id)} />
              <FaTrash className="action-icon" onClick={() => handleTaskDelete(task.id)} />
            </div>
          </div>
        ))}

        {/* Display ConfirmDeleteDialog if deleteTaskId is set */}
        {deleteTaskId && (
          <ConfirmDeleteDialog
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
          />
        )}

        {/* Display TaskEditForm for the selected task being edited */}
        {editingTaskId && (
          <TaskEditForm
            task={tasks.find((task) => task.id === editingTaskId)}
            onUpdateTask={handleUpdateTask}
            onCloseEdit={() => setEditingTaskId(null)}
          />
        )}
        {/* Display TaskDetails for the selected task */}
        <TaskDetails task={selectedTask} />
      </div>
    </div>
  );
};

export default TaskPage;