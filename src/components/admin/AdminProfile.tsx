import React, { useState } from 'react';
import { Save, Upload } from 'lucide-react';
import { api, Settings } from '../../services/api';

interface AdminProfileProps {
  settings: Settings;
  onRefresh: () => void;
  onShowToast: (msg: string) => void;
}

export const AdminProfile: React.FC<AdminProfileProps> = ({ settings, onRefresh, onShowToast }) => {
  const [formData, setFormData] = useState<Settings>({ ...settings });
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.saveSettings(formData);
      onShowToast('Changes saved');
      onRefresh();
    } catch {
      alert('Error updating profile');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'photo' | 'cv_url') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await api.uploadFile(file);
      setFormData({ ...formData, [field]: url });
      onShowToast('File uploaded successfully');
    } catch {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Profile & Site Settings</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-saffron)' }}>General Info</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Full Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Job Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Availability Line</label>
            <input
              type="text"
              value={formData.availability || ''}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>One-Sentence Headline</label>
            <input
              type="text"
              value={formData.headline || ''}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Bio Paragraph</label>
            <textarea
              rows={3}
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>About Paragraph</label>
            <textarea
              rows={3}
              value={formData.about || ''}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
            />
          </div>
        </div>

        {/* Media & Links */}
        <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-saffron)' }}>Contact & Media Assets</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Email Address</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Phone Number</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>GitHub Profile URL</label>
              <input
                type="text"
                value={formData.github || ''}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>LinkedIn Profile URL</label>
              <input
                type="text"
                value={formData.linkedin || ''}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Portrait Photo URL or Upload</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
              <input
                type="text"
                value={formData.photo || ''}
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)' }}
              />
              <label className="btn btn-outline" style={{ cursor: 'pointer' }}>
                <Upload size={16} />
                {uploading ? '...' : 'Upload'}
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'photo')} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>CV File URL or Upload</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
              <input
                type="text"
                value={formData.cv_url || ''}
                onChange={(e) => setFormData({ ...formData, cv_url: e.target.value })}
                style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)' }}
              />
              <label className="btn btn-outline" style={{ cursor: 'pointer' }}>
                <Upload size={16} />
                {uploading ? '...' : 'Upload CV'}
                <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, 'cv_url')} style={{ display: 'none' }} />
              </label>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-saffron" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
