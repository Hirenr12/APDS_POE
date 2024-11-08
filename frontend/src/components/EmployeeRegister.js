import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function EmployeeRegister() {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const generateAccountNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000); 
  };

  // Regex patterns for validation
  const fullNamePattern = /^[A-Za-z\s]+$/; 
  const userNamePattern = /^[a-zA-Z0-9._-]+$/;
  const idNumberPattern = /^\d{13}$/; 
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/; 

  const handleRegister = async (event) => {
    event.preventDefault();
  
    // Validate input fields
    if (!fullNamePattern.test(fullName)) {
      alert('Invalid full name. Only letters and spaces are allowed.');
      return;
    }

    if (!userNamePattern.test(userName)) {
      alert('Invalid username. Only alphanumeric characters, dots, underscores, and dashes are allowed.');
      return;
    }

    if (!idNumberPattern.test(idNumber)) {
      alert('Invalid ID Number. It must be a 13-digit number.');
      return;
    }

    if (!passwordPattern.test(password)) {
      alert('Invalid password. It must be at least 5 characters long and contain at least one letter and one number.');
      return;
    }

    const accountNumber = generateAccountNumber();

    const registrationData = {
      fullName,
      userName,
      idNumber,
      accountNumber,
      password,
    };
  
    try {
      const response = await fetch('https://localhost/auth/employee/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });
  
      const data = await response.json();
      
      if (response.status === 201) {
        alert('Employee registration successful');
        navigate('/employee-dashboard'); // Redirect to employee dashboard
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error registering employee:', error);
      alert('An error occurred while registering. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2>Employee Register</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label>Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Username:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>ID Number (SA):</label>
            <input
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Register Employee</button>
        </form>
        <p style={styles.link}>
          Already have an account? <Link to="/" style={styles.linkText}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  formWrapper: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  inputGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  input: {
    width: 'calc(100% - 20px)',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '5px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  link: {
    marginTop: '20px',
  },
  linkText: {
    color: '#4CAF50',
    textDecoration: 'none',
  },
};

export default EmployeeRegister;
