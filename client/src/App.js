import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Register from './pages/Register';
import PublicProfile from './pages/PublicProfile';
import Login from './pages/Login'; 

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/:username" element={<PublicProfile />} />
          <Route path="/" element={
            <div style={{ padding: '20px' }}>
              <h1>Welcome to PlayerCard</h1>
              <p>Your Digital Profile for Gamers</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
