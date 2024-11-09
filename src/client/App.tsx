// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../server/pages/LandingPage';
import AuthPage from '../server/pages/AuthPage';
import LoginPage from '../server/pages/LoginPage';
import RegisterPage from '../server/pages/RegisterPage';
import GameLobby from '../server/pages/GameLobby';
import GamePage from '../server/pages/GamePage';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/game-lobby" element={<GameLobby />} />
        <Route path="/game-page" element={<GamePage />} />
      </Routes>
    </Router>
  );
};

export default App;
