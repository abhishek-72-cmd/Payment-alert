import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login({ email, password });
      if (response.token && response.userId) {
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('token', response.token);
        setSuccess('Login successful!');
        setError('');
        navigate('/dashboard'); // Navigate to the dashboard
      }
    } catch (err) {
      setError('Invalid email or password');
      setSuccess('');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">{success}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="text-muted">Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;