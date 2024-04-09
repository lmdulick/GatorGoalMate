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



//prior code without homepage 
/*
import React from 'react';
import './App.css';
//import CreateAccount from './CreateAccount'; 
import Login from './Login'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        //<Login/>
      </header>
    </div>
  );
}

export default App;
*/