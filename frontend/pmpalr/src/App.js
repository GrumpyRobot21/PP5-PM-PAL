import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Update import

import HomePage from './components/HomePage';
import CreateProfilePage from './components/CreateProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>  {/* Use Routes component instead of Switch */}
          <Route path="/" element={<HomePage />} />  {/* Use element prop */}
          <Route path="/create-profile" element={<CreateProfilePage />} />  {/* Use element prop */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
