import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import RoleSelection from './pages/RoleSelection';
import FarmerOnboarding from './pages/farmer/FarmerOnboarding';
import BusinessOnboarding from './pages/business/BusinessOnboarding';
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import BusinessDashboard from './pages/business/BusinessDashboard';
import BankOnboarding from './pages/bank/BankOnboarding';
import BankDashboard from './pages/bank/BankDashboard';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="app-container">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/roles" element={<RoleSelection />} />
            <Route path="/farmer/register" element={<FarmerOnboarding />} />
            <Route path="/business/register" element={<BusinessOnboarding />} />
            <Route path="/bank/register" element={<BankOnboarding />} />
            <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
            <Route path="/business/dashboard" element={<BusinessDashboard />} />
            <Route path="/bank/dashboard" element={<BankDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
