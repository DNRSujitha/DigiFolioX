import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Portfolio from './components/Portfolio';
import MyPortfolios from './components/MyPortfolios';
import PublicPortfolioView from './components/PublicPortfolioView';

// Import all template entries
import ModernEntry from './modern-style/Entry';
import OldAestheticEntry from './old-aesthetic/Entry';
import CreativeEntry from './creative/Entry';
import TechEntry from './tech/Entry';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('digifoliox_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes (require login) */}
        <Route path="/portfolio" element={
          <ProtectedRoute>
            <Portfolio />
          </ProtectedRoute>
        } />
        <Route path="/my-portfolios" element={
          <ProtectedRoute>
            <MyPortfolios />
          </ProtectedRoute>
        } />
        
        {/* Owner Template Routes (require login - for viewing own portfolios) */}
        <Route path="/modern/:uniqueId" element={
          <ProtectedRoute>
            <ModernEntry />
          </ProtectedRoute>
        } />
        <Route path="/old-aesthetic/:uniqueId" element={
          <ProtectedRoute>
            <OldAestheticEntry />
          </ProtectedRoute>
        } />
        <Route path="/creative/:uniqueId" element={
          <ProtectedRoute>
            <CreativeEntry />
          </ProtectedRoute>
        } />
        <Route path="/tech/:uniqueId" element={
          <ProtectedRoute>
            <TechEntry />
          </ProtectedRoute>
        } />
        
        {/* Public Portfolio View (published portfolios - no login required) */}
        <Route path="/p/:uniqueId" element={<PublicPortfolioView />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;