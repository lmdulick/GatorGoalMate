
//test new code for navitagting between pages 
//for main page
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import CreateAccount from './CreateAccount';
// Assuming HomePage is another component you might use elsewhere
import HomePage from './HomePage';
import MainPage from './MainPage'; // The MainPage component
import ProfilePage from './ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> {/* MainPage as the default view */}
        <Route path="/home" element={<HomePage />} /> {/* Assuming you still want to use HomePage */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        {/* Add any other routes here */}
      </Routes>
    </Router>
  );
}

export default App;

//for HOMEPAGE
/*
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
        
      </Routes>
    </Router>
  );
}

export default App;
*/


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