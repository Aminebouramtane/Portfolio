import React, { useState } from 'react';
import { Download, Upload, AlertTriangle } from 'lucide-react';
import { api } from '../../services/api';

interface AdminBackupProps {
  onRefresh: () => void;
  onShowToast: (msg: string) => void;
}

export const AdminBackup: React.FC<AdminBackupProps> = ({ onRefresh, onShowToast }) => {
  const [importing, setImporting] = useState(false);

  const handleExport = async () => {
    try {
      await api.exportBackup();
      onShowToast('JSON export downloaded');
    } catch {
      alert('Export failed');
    }
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!window.confirm('Importing JSON will overwrite current portfolio data. Continue?')) {
      return;
    }

    setImporting(true);
    try {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        try {
          const json = JSON.parse(evt.target?.result as string);
          await api.importBackup(json);
          onShowToast('Backup imported successfully');
          onRefresh();
        } catch {
          alert('Invalid JSON file format');
        } finally {
          setImporting(false);
        }
      };
      reader.readAsText(file);
    } catch {
      setImporting(false);
      alert('File read error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Backup & Migration</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Export JSON Card */}
        <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-saffron)' }}>Export Site Backup</h3>
          <p style={{ fontSize: '0.925rem', color: 'var(--color-slate)' }}>
            Download a full JSON file containing all settings, projects, skills, timeline items, and messages.
          </p>
          <button onClick={handleExport} className="btn btn-saffron" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
            <Download size={18} />
            Export JSON Backup
          </button>
        </div>

        {/* Import JSON Card */}
        <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-saffron)' }}>Import Site Backup</h3>
          <p style={{ fontSize: '0.925rem', color: 'var(--color-slate)' }}>
            Upload a previously exported JSON backup file to restore complete portfolio content.
          </p>
          <label className="btn btn-outline" style={{ cursor: 'pointer', marginTop: 'auto', alignSelf: 'flex-start' }}>
            <Upload size={18} />
            {importing ? 'Importing...' : 'Select JSON File'}
            <input type="file" accept=".json" onChange={handleImportFile} style={{ display: 'none' }} />
          </label>
        </div>
      </div>
    </div>
  );
};
