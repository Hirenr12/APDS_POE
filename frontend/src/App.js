import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/register';
import PaymentsPortal from './components/PaymentsPortal';
import AccountDetails from './components/AccountDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payments" element={<PaymentsPortal />} />
        <Route path="/account-details" element={<AccountDetails />} />
      </Routes>
    </Router>
  );
}

export default App;