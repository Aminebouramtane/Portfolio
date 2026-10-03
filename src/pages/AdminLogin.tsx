import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.login(password);
      navigate('/admin');
    } catch (err: any) {
      setError('Invalid password. Default is admin123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 178, 30, 0.15)',
              color: 'var(--color-saffron)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}
          >
            <Lock size={24} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-bone)' }}>
            Admin Login
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-slate)', marginTop: '0.25rem' }}>
            Portfolio Content Management System
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {error && (
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #ef4444',
                color: '#ef4444',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="admin-pass" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-bone)' }}>
              Password
            </label>
            <input
              type="password"
              id="admin-pass"
              required
              autoFocus
              placeholder="Enter password (default: admin123)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                backgroundColor: 'var(--bg-ink)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1rem',
                color: 'var(--color-bone)',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              padding: '0.85rem',
              fontSize: '1rem',
              width: '100%',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <a href="/" style={{ color: 'var(--color-slate)', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← Back to Public Website
          </a>
        </div>
      </div>
    </div>
  );
};
