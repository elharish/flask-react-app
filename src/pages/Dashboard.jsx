import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  User,
  Smartphone,
  Mail,
  CalendarDays,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  LogOut,
  HandMetal,
} from 'lucide-react';

const API = '/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${API}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load profile.');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Loading your profile...</p>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="loading-screen">
        <div className="alert alert-error">
          <AlertTriangle size={16} /> {error}
        </div>
      </div>
    );
  }

  // ── Get initials ──────────────────────────────────────────────────────────
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="dashboard-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-icon">
            <User size={20} color="white" strokeWidth={2.2} />
          </div>
          <span className="navbar-title">MyApp</span>
        </div>
        <button id="logout-btn" className="btn-logout" onClick={handleLogout}>
          <LogOut size={15} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Sign Out
        </button>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Greeting */}
        <div className="dashboard-greeting">
          <p className="greeting-label">
            <HandMetal size={15} style={{ marginRight: 6, verticalAlign: 'middle' }} />
            Welcome back
          </p>
          <h1 className="greeting-name">{user.name}</h1>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">{initials}</div>
            <div className="profile-meta">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="info-grid">
            {/* Name */}
            <div className="info-item">
              <div className="info-icon"><User size={22} strokeWidth={1.8} /></div>
              <div className="info-label">Full Name</div>
              <div className="info-value">{user.name}</div>
            </div>

            {/* Mobile */}
            <div className="info-item">
              <div className="info-icon"><Smartphone size={22} strokeWidth={1.8} /></div>
              <div className="info-label">Mobile</div>
              <div className="info-value">{user.mobile}</div>
            </div>

            {/* Email */}
            <div className="info-item">
              <div className="info-icon"><Mail size={22} strokeWidth={1.8} /></div>
              <div className="info-label">Email</div>
              <div className="info-value">{user.email}</div>
            </div>

            {/* Member since */}
            <div className="info-item">
              <div className="info-icon"><CalendarDays size={22} strokeWidth={1.8} /></div>
              <div className="info-label">Member Since</div>
              <div className="info-value">{user.created_at}</div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon"><LockKeyhole size={28} strokeWidth={1.6} /></div>
            <div className="stat-label">Account Status</div>
            <div className="stat-value">Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><ShieldCheck size={28} strokeWidth={1.6} /></div>
            <div className="stat-label">Security</div>
            <div className="stat-value">Protected</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Sparkles size={28} strokeWidth={1.6} /></div>
            <div className="stat-label">Plan</div>
            <div className="stat-value">Free Tier</div>
          </div>
        </div>
      </main>
    </div>
  );
}
