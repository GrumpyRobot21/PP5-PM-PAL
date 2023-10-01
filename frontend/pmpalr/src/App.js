import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateProfilePage from './components/CreateProfilePage';
import TaskPage from './components/TaskPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-profile" element={<CreateProfilePage />} />
          <Route path="/tasks" element={<TaskPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
