import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import './TaskPage.css';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({ title: '', description: '', dueDate: '', status: 'Open' });
  const [showCreateTaskFields, setShowCreateTaskFields] = useState(false);

  // Add a test task on component mount for demonstration
  useEffect(() => {
    const testTask = {
      id: 'test-task-id',
      title: 'Test Task',
      description: 'Lorem Ipsum text',
      dueDate: '2023-10-05',
      status: 'Open'
    };
    setTasks([testTask]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const newTask = { ...taskData, id: Math.random().toString() };
    setTasks([...tasks, newTask]);
    setTaskData({ title: '', description: '', dueDate: '', status: 'Open' });
    setShowCreateTaskFields(false); // Close the form after submission
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleTaskStatusUpdate = (taskId, newStatus) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
  };

  const toggleDescription = (taskId) => {
    const descriptionElement = document.getElementById(`task-description-${taskId}`);
    if (descriptionElement) {
      descriptionElement.style.display = descriptionElement.style.display === 'none' ? 'block' : 'none';
    }
  };

  return (
    <div className="task-page">
      <h1 className="pm-pal-title styled-title">PM-PAL</h1>

      <div className="task-container">
        <button
          className="create-task-button"
          onClick={() => setShowCreateTaskFields((prev) => !prev)}
        >

          Create Task
        </button>

        {showCreateTaskFields && (
          <form onSubmit={handleTaskSubmit} className="task-form">
            <input type="text" name="title" placeholder="Task Title" value={taskData.title} onChange={handleChange} />
            <textarea
              name="description"
              placeholder="Task Description"
              value={taskData.description}
              onChange={handleChange}
            />
            <input type="date" name="dueDate" value={taskData.dueDate} onChange={handleChange} />
            <button type="submit">Create Task</button>
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
          <input type="text" placeholder="Search by title, due date, status" className="search-input" />
          <button className="search-button">
            Search Tasks
          </button>
        </div>

        {/* Task List */}
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            {/* Title */}
            <div className="task-info">{task.title}</div>

            {/* Status */}
            <div className="task-info">{task.status}</div>

            {/* Due Date */}
            <div className="task-info">{task.dueDate}</div>

            {/* Actions */}
            <div className="task-actions">
              <FaEdit className="action-icon" />
              <FaTrash className="action-icon" onClick={() => handleTaskDelete(task.id)} />
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default TaskPage;
