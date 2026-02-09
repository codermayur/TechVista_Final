import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Preloader from './components/Common/Preloader.js';
import Home from './pages/Home';
import Events from './pages/Events';
import Contact from './pages/Contact';
import About from './pages/About';
import EventMasterTerminal from './pages/Events/EventMasterTerminal.js';

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) return <Preloader onFinish={() => setLoading(false)} />;

  const sponsorLoadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />

      {/* This is the dedicated route for registration.
        It captures the event ID from the URL and passes it to the Terminal.
      */}
      <Route path="/register/:eventId" element={<EventMasterTerminal />} />

      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/sponsor" element={<div style={sponsorLoadingStyle}>Sponsor Page Loading....</div>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
