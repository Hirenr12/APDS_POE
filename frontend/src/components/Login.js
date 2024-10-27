import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  //the regex patterns
  const userNamePattern = /^[a-zA-Z0-9._-]+$/; 
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/; // At least 5 characters, 1 letter, and 1 number

  const handleLogin = async (event) => {
    event.preventDefault();

    //this is the validation for the regex
    if (!userNamePattern.test(userName)) {
      alert('Invalid username. Only alphanumeric characters, dots, underscores, and dashes are allowed.');
      return;
    }
    
    if (!passwordPattern.test(password)) {
      alert('Invalid password. It must be at least 8 characters long and contain at least one letter and one number.');
      return;
    }

    try {
      
      const response = await fetch('https://localhost/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: userName, password: password }),
      });
      
      const data = await response.json();

      if (response.ok) {
        //successful
        console.log('Login successful:');

        //stores token
        localStorage.setItem('token', data.token);

        //redirection
        navigate('/payments'); 
      } else {
        //failed login attempt
        console.error(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label>Username:</label> {/* Changed label to ID Number */}
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.link}>
          No account? <Link to="/register" style={styles.linkText}>Register here</Link>
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
  tempButton: {
    padding: '10px',
    backgroundColor: '#f44336', // Red background for the temp button
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px', // Add some space above the button
  },
  link: {
    marginTop: '20px',
  },
  linkText: {
    color: '#4CAF50',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Login;
