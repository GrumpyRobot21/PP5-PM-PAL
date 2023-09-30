import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateProfilePage from './components/CreateProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/create-profile" component={CreateProfilePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
