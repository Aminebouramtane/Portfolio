import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import { api, TimelineItem } from '../../services/api';

interface AdminTimelineProps {
  timeline: TimelineItem[];
  onRefresh: () => void;
  onShowToast: (msg: string) => void;
}

export const AdminTimeline: React.FC<AdminTimelineProps> = ({ timeline, onRefresh, onShowToast }) => {
  const [editingItem, setEditingItem] = useState<Partial<TimelineItem> | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.role) return;
    try {
      await api.saveTimelineItem(editingItem);
      onShowToast('Changes saved');
      setEditingItem(null);
      onRefresh();
    } catch {
      alert('Error saving item');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await api.deleteTimelineItem(id);
      onShowToast('Item deleted');
      onRefresh();
    } catch {
      alert('Error deleting item');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Experience & Education</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-slate)' }}>Total {timeline.length} timeline nodes</p>
        </div>
        <button
          onClick={() => setEditingItem({ kind: 'work', role: '', org: '', place: 'Marrakech, Morocco', period: '2026', details: '' })}
          className="btn btn-saffron"
        >
          <Plus size={18} />
          Add Item
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {timeline.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: 'var(--bg-ink)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.72rem', backgroundColor: item.kind === 'work' ? 'rgba(47, 69, 255, 0.2)' : 'rgba(255, 178, 30, 0.2)', color: item.kind === 'work' ? 'var(--color-primary)' : 'var(--color-saffron)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-sm)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {item.kind}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-slate)' }}>{item.period}</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-bone)' }}>{item.role}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 600 }}>{item.org} • {item.place}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => setEditingItem(item)} style={{ background: 'transparent', border: 'none', color: 'var(--color-slate)', cursor: 'pointer' }}>
                <Edit2 size={16} />
              </button>
              <button onClick={() => handleDelete(item.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', maxWidth: '550px', width: '100%', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{editingItem.id ? 'Edit Timeline Item' : 'Add Timeline Item'}</h3>
              <button onClick={() => setEditingItem(null)} style={{ background: 'transparent', border: 'none', color: 'var(--color-bone)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Kind</label>
                  <select
                    value={editingItem.kind || 'work'}
                    onChange={(e) => setEditingItem({ ...editingItem, kind: e.target.value as any })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                  >
                    <option value="work">Work Experience</option>
                    <option value="education">Education</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Period / Dates</label>
                  <input
                    type="text"
                    required
                    value={editingItem.period || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Role / Degree Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.role || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Organization / School</label>
                  <input
                    type="text"
                    value={editingItem.org || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, org: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Place / Location</label>
                  <input
                    type="text"
                    value={editingItem.place || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, place: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Details (Newline separated bullets)</label>
                <textarea
                  rows={4}
                  value={editingItem.details || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, details: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" onClick={() => setEditingItem(null)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-saffron"><Save size={16} /> Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
