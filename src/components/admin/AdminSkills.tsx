import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import { api, Skill } from '../../services/api';

interface AdminSkillsProps {
  skills: Skill[];
  onRefresh: () => void;
  onShowToast: (msg: string) => void;
}

export const AdminSkills: React.FC<AdminSkillsProps> = ({ skills, onRefresh, onShowToast }) => {
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill.name) return;
    try {
      await api.saveSkill(editingSkill);
      onShowToast('Changes saved');
      setEditingSkill(null);
      onRefresh();
    } catch {
      alert('Error saving skill');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await api.deleteSkill(id);
      onShowToast('Skill deleted');
      onRefresh();
    } catch {
      alert('Error deleting skill');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manage Skills</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-slate)' }}>Total {skills.length} skills</p>
        </div>
        <button
          onClick={() => setEditingSkill({ grp: 'AI & ML', name: '' })}
          className="btn btn-saffron"
        >
          <Plus size={18} />
          Add Skill
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', padding: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {skills.map((s) => (
            <div
              key={s.id}
              style={{
                backgroundColor: 'var(--bg-ink)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-saffron)', display: 'block' }}>{s.grp}</span>
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-bone)' }}>{s.name}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button
                  onClick={() => setEditingSkill(s)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--color-slate)', cursor: 'pointer', padding: '0.35rem' }}
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.35rem' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingSkill && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', maxWidth: '440px', width: '100%', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{editingSkill.id ? 'Edit Skill' : 'Add Skill'}</h3>
              <button onClick={() => setEditingSkill(null)} style={{ background: 'transparent', border: 'none', color: 'var(--color-bone)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Group / Category</label>
                <select
                  value={editingSkill.grp || 'AI & ML'}
                  onChange={(e) => setEditingSkill({ ...editingSkill, grp: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                >
                  <option value="AI & ML">AI & ML</option>
                  <option value="Computer Vision">Computer Vision</option>
                  <option value="Data & BI">Data & BI</option>
                  <option value="Full Stack">Full Stack</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Skill Name *</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" onClick={() => setEditingSkill(null)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-saffron"><Save size={16} /> Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
