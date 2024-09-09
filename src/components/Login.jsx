import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

async function loginUser(email, password) {
  try {
    const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      return data.token;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleRegisterClick = () => navigate('/register');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(email, password);
      localStorage.setItem('token', token);
      setToken(token);
      navigate('/');
    } catch (error) {
      setLoginMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <form id='signUpForm' onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label htmlFor='password'>Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
      <div>Don't have an account? <button onClick={handleRegisterClick}>Sign up here!</button></div>
      {loginMessage && <p>{loginMessage}</p>}
    </div>
  );
}

export default Login;