import React, { useState } from 'react';
import { Key, Save, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

interface AdminAccountProps {
  onShowToast: (msg: string) => void;
}

export const AdminAccount: React.FC<AdminAccountProps> = ({ onShowToast }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      alert('Password must be at least 4 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await api.updatePassword(newPassword);
      onShowToast('Password updated successfully');
      setMsg('Password updated successfully');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      alert('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Account & Password</h2>

      <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', padding: '2rem', maxWidth: '500px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {msg && (
            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} />
              {msg}
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>New Password</label>
            <input
              type="password"
              required
              minLength={4}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Confirm New Password</label>
            <input
              type="password"
              required
              minLength={4}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-saffron" style={{ marginTop: '0.5rem' }}>
            <Key size={18} />
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};
