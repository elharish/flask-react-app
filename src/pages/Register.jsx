import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlertTriangle, CheckCircle, User } from 'lucide-react';

const API = 'https://flask-react-api.mywire.org/api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError('');
    setSuccess('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { name, mobile, email, password, confirm_password } = form;

    if (!name || !mobile || !email || !password || !confirm_password) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirm_password) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API}/register`, form);
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1800);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-bg">
      <div className="auth-card" style={{ maxWidth: '480px' }}>
        {/* Brand */}
        <div className="brand">
          <div className="brand-icon">
            <User size={22} color="white" strokeWidth={2.2} />
          </div>
          <span className="brand-name">MyApp</span>
        </div>

        <h1 className="auth-title">Create account</h1>
        <p className="auth-subtitle">Join us today — it only takes a minute</p>

        {/* Alerts */}
        {error && (
          <div className="alert alert-error">
            <AlertTriangle size={16} />
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            <CheckCircle size={16} />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-name">Full Name</label>
            <input
              id="reg-name"
              className="form-input"
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>

          {/* Mobile */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-mobile">Mobile Number</label>
            <input
              id="reg-mobile"
              className="form-input"
              type="tel"
              name="mobile"
              placeholder="9876543210"
              value={form.mobile}
              onChange={handleChange}
              autoComplete="tel"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">Email Address</label>
            <input
              id="reg-email"
              className="form-input"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              className="form-input"
              type="password"
              name="password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
            <input
              id="reg-confirm"
              className="form-input"
              type="password"
              name="confirm_password"
              placeholder="Repeat your password"
              value={form.confirm_password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          <button
            id="register-submit"
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-link-row">
          Already have an account?
          <Link to="/login" className="auth-link">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
