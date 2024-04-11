import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import CreateAccount from './CreateAccount';
import HomePage from './HomePage';
import MainPage from './MainPage';
import ProfilePage from './ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* Add any other routes here */}
      </Routes>
    </Router>
  );
}

export default App;


/*
if you encounter an error when running this branch/the frontend, make sure to run this command first:
      npm install react-router-dom
*/