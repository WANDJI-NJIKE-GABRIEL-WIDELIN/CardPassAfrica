import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import Documents from './pages/Documents';
import AdminDashboard from './pages/AdminDashboard';
import VerifierStudio from './pages/VerifierStudio';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/wallet"
            element={isAuthenticated ? <Wallet /> : <Navigate to="/login" />}
          />
          <Route
            path="/documents"
            element={isAuthenticated ? <Documents /> : <Navigate to="/login" />}
          />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/verifier" element={<VerifierStudio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
