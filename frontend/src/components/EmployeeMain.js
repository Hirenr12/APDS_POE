import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeMain() {
  const navigate = useNavigate();
  
  const handleRegCustomer = () => {
    navigate('/register');
  };
  
  const handleRegEmployee = () => {
    navigate('/employeeregister');
  };
  
  const handleViewClientPayments = () => {
    navigate('/paymentsdisplay');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/'); // go back to the login page
  };

  return (
    <div style={styles.container}>
      {/* Logout button positioned in the top right corner */}
      <button onClick={handleLogout} style={styles.tempButton}>Logout</button>
      
      <h2>Welcome to the Employee Main Page</h2>
      <div style={styles.boxContainer}>
        <div style={styles.box}>
          <h3>Register a Customer</h3>
          <button style={styles.button} onClick={handleRegCustomer}>
            Register Customer
          </button>
        </div>
        <div style={styles.box}>
          <h3>Register an Employee</h3>
          <button style={styles.button} onClick={handleRegEmployee}>
            Register Employee
          </button>
        </div>
        <div style={styles.box}>
          <h3>View Client Payments</h3>
          <button style={styles.button} onClick={handleViewClientPayments}>
            View Payments
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    padding: '20px',
    position: 'relative', // Important for absolute positioning of the logout button
  },
  tempButton: {
    position: 'absolute', // Position it at the top right
    top: '20px', // Adjust top distance
    right: '20px', // Adjust right distance
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  boxContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  box: {
    width: '200px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  button: {
    marginTop: '10px',
    padding: '10px',
    width: '100%',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default EmployeeMain;
