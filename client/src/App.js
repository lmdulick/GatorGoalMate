//test new code for navitagting between pages 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; // path to your Login component
import CreateAccount from './CreateAccount'; // path to your CreateAccount component
import HomePage from './HomePage'; // path to your new HomePage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;


/*
if you encounter an error when running this branch/the frontend, make sure to run this command first:
      npm install react-router-dom
*/