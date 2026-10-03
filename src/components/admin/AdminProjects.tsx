import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, MoveUp, MoveDown, ExternalLink, X, Upload, Save, Globe } from 'lucide-react';
import { api, Project, ProjectMetric, GalleryItem } from '../../services/api';

interface AdminProjectsProps {
  projects: Project[];
  onRefresh: () => void;
  onShowToast: (msg: string) => void;
}

export const AdminProjects: React.FC<AdminProjectsProps> = ({ projects, onRefresh, onShowToast }) => {
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [activeTab, setActiveTab] = useState<'en' | 'fr' | 'ar'>('en');
  const [uploading, setUploading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleCreateNew = () => {
    setEditingProject({
      title: '',
      slug: '',
      tagline: '',
      description: '',
      context: '',
      approach: '',
      results: '',
      learned: '',
      category: 'BI & Analytics',
      tech: ['Python', 'Power BI'],
      metrics: [{ label: 'Metric 1', value: '100%' }],
      year: new Date().getFullYear(),
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      gallery: [],
      link: 'https://github.com/Aminebouramtane',
      repo: 'https://github.com/Aminebouramtane',
      featured: false,
      published: true,
      draft: false
    });
    setActiveTab('en');
  };

  const handleTitleChange = (val: string) => {
    if (!editingProject) return;
    const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setEditingProject({
      ...editingProject,
      title: val,
      slug: editingProject.id ? editingProject.slug : autoSlug
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    try {
      await api.saveProject(editingProject);
      onShowToast('Changes saved');
      setEditingProject(null);
      onRefresh();
    } catch (err) {
      alert('Error saving project');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteProject(id);
      onShowToast('Project deleted');
      setDeleteConfirmId(null);
      onRefresh();
    } catch (err) {
      alert('Error deleting project');
    }
  };

  const handleTogglePublish = async (project: Project) => {
    try {
      await api.saveProject({ ...project, published: !project.published });
      onShowToast(project.published ? 'Project hidden' : 'Project published');
      onRefresh();
    } catch (err) {
      alert('Error toggling status');
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const newProjects = [...projects];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newProjects.length) return;

    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIdx];
    newProjects[targetIdx] = temp;

    const ids = newProjects.map((p) => p.id);
    try {
      await api.reorderProjects(ids);
      onShowToast('Order updated');
      onRefresh();
    } catch (err) {
      alert('Error reordering');
    }
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;

    setUploading(true);
    try {
      const url = await api.uploadFile(file);
      if (isGallery) {
        const newGallery = [...(editingProject.gallery || []), { url, alt: file.name }];
        setEditingProject({ ...editingProject, gallery: newGallery });
      } else {
        setEditingProject({ ...editingProject, image: url });
      }
      onShowToast('Image uploaded');
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manage Projects</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-slate)' }}>Total {projects.length} projects</p>
        </div>
        <button onClick={handleCreateNew} className="btn btn-saffron" style={{ gap: '0.5rem' }}>
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {/* Projects Table */}
      <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-ink)', fontSize: '0.85rem', color: 'var(--color-slate)' }}>
              <th style={{ padding: '1rem' }}>Order</th>
              <th style={{ padding: '1rem' }}>Project</th>
              <th style={{ padding: '1rem' }}>Category / Year</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, index) => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button
                      onClick={() => handleMove(index, 'up')}
                      disabled={index === 0}
                      style={{ background: 'transparent', border: 'none', color: 'var(--color-slate)', cursor: index === 0 ? 'not-allowed' : 'pointer' }}
                    >
                      <MoveUp size={16} />
                    </button>
                    <button
                      onClick={() => handleMove(index, 'down')}
                      disabled={index === projects.length - 1}
                      style={{ background: 'transparent', border: 'none', color: 'var(--color-slate)', cursor: index === projects.length - 1 ? 'not-allowed' : 'pointer' }}
                    >
                      <MoveDown size={16} />
                    </button>
                  </div>
                </td>

                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={p.image} alt={p.title} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                    <div>
                      <span style={{ fontWeight: 700, display: 'block', color: 'var(--color-bone)' }}>{p.title}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-slate)' }}>/{p.slug}</span>
                    </div>
                  </div>
                </td>

                <td style={{ padding: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-saffron)' }}>{p.category}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-slate)', display: 'block' }}>{p.year}</span>
                </td>

                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {p.published ? (
                      <span style={{ fontSize: '0.72rem', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-sm)', fontWeight: 700 }}>Published</span>
                    ) : (
                      <span style={{ fontSize: '0.72rem', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-sm)', fontWeight: 700 }}>Hidden</span>
                    )}
                    {p.featured && (
                      <span style={{ fontSize: '0.72rem', backgroundColor: 'rgba(255, 178, 30, 0.15)', color: 'var(--color-saffron)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-sm)', fontWeight: 700 }}>Featured</span>
                    )}
                  </div>
                </td>

                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleTogglePublish(p)}
                      title={p.published ? 'Hide Project' : 'Publish Project'}
                      style={{ background: 'rgba(236, 235, 227, 0.06)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', padding: '0.4rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                    >
                      {p.published ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={() => { setEditingProject(p); setActiveTab('en'); }}
                      title="Edit Project"
                      style={{ background: 'rgba(236, 235, 227, 0.06)', border: '1px solid var(--border-color)', color: 'var(--color-saffron)', padding: '0.4rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(p.id)}
                      title="Delete Project"
                      style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#ef4444', padding: '0.4rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', maxWidth: '400px', width: '100%', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>Confirm Delete</h3>
            <p style={{ color: 'var(--color-slate)', fontSize: '0.925rem', marginBottom: '1.5rem' }}>
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteConfirmId(null)} className="btn btn-outline">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirmId)} className="btn btn-primary" style={{ backgroundColor: '#ef4444' }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Add Project Modal / Side Panel */}
      {editingProject && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', overflowY: 'auto' }}>
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', maxWidth: '850px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                {editingProject.id ? 'Edit Project' : 'Add New Project'}
              </h3>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                {editingProject.slug && (
                  <a
                    href={`/projects/${editingProject.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}
                  >
                    <ExternalLink size={14} />
                    Preview
                  </a>
                )}
                <button onClick={() => setEditingProject(null)} style={{ background: 'transparent', border: 'none', color: 'var(--color-bone)', cursor: 'pointer' }}>
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Language Translation Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <Globe size={18} className="text-saffron" style={{ marginRight: '0.5rem' }} />
              {(['en', 'fr', 'ar'] as const).map((tTab) => (
                <button
                  key={tTab}
                  onClick={() => setActiveTab(tTab)}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    backgroundColor: activeTab === tTab ? 'var(--color-primary)' : 'transparent',
                    color: activeTab === tTab ? '#ffffff' : 'var(--color-slate)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  {tTab}
                </button>
              ))}
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* English / Default Fields */}
              {activeTab === 'en' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Title *</label>
                      <input
                        type="text"
                        required
                        value={editingProject.title || ''}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Slug (URL)</label>
                      <input
                        type="text"
                        required
                        value={editingProject.slug || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>One-Line Tagline / Summary</label>
                    <input
                      type="text"
                      value={editingProject.tagline || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Category</label>
                      <select
                        value={editingProject.category || 'BI & Analytics'}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                      >
                        <option value="BI & Analytics">BI & Analytics</option>
                        <option value="Data Analysis">Data Analysis</option>
                        <option value="Computer Vision">Computer Vision</option>
                        <option value="Machine Learning">Machine Learning</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Year</label>
                      <input
                        type="number"
                        value={editingProject.year || 2026}
                        onChange={(e) => setEditingProject({ ...editingProject, year: parseInt(e.target.value, 10) })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Tools (comma separated)</label>
                      <input
                        type="text"
                        value={(editingProject.tech || []).join(', ')}
                        onChange={(e) => setEditingProject({ ...editingProject, tech: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                      />
                    </div>
                  </div>

                  {/* Case Study Fields */}
                  <div style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-saffron)' }}>Case Study Content</h4>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Context & Problem</label>
                      <textarea
                        rows={2}
                        value={editingProject.context || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, context: e.target.value })}
                        style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.2rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Engineering Approach</label>
                      <textarea
                        rows={2}
                        value={editingProject.approach || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, approach: e.target.value })}
                        style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.2rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Results & Business Impact</label>
                      <textarea
                        rows={2}
                        value={editingProject.results || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, results: e.target.value })}
                        style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.2rem' }}
                      />
                    </div>
                  </div>

                  {/* Key Metrics Dynamic Rows */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Key Impact Metrics (Count Up)</label>
                      <button
                        type="button"
                        onClick={() => setEditingProject({ ...editingProject, metrics: [...(editingProject.metrics || []), { label: 'New Metric', value: '100%' }] })}
                        style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--color-saffron)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8rem' }}
                      >
                        + Add Metric
                      </button>
                    </div>
                    {(editingProject.metrics || []).map((m, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <input
                          type="text"
                          placeholder="Label (e.g., Transactions)"
                          value={m.label}
                          onChange={(e) => {
                            const newM = [...(editingProject.metrics || [])];
                            newM[idx].label = e.target.value;
                            setEditingProject({ ...editingProject, metrics: newM });
                          }}
                          style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)' }}
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g., 7,000+)"
                          value={m.value}
                          onChange={(e) => {
                            const newM = [...(editingProject.metrics || [])];
                            newM[idx].value = e.target.value;
                            setEditingProject({ ...editingProject, metrics: newM });
                          }}
                          style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)' }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newM = editingProject.metrics?.filter((_, i) => i !== idx);
                            setEditingProject({ ...editingProject, metrics: newM });
                          }}
                          style={{ background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#ef4444', padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Image & Upload */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Cover Image URL or File Upload</label>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                      <input
                        type="text"
                        value={editingProject.image || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)' }}
                      />
                      <label className="btn btn-outline" style={{ cursor: 'pointer', padding: '0.75rem 1rem' }}>
                        <Upload size={16} />
                        {uploading ? '...' : 'Upload'}
                        <input type="file" accept="image/*" onChange={(e) => handleImageFileUpload(e, false)} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>

                  {/* Status Toggles */}
                  <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                      <input
                        type="checkbox"
                        checked={editingProject.published ?? true}
                        onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                      />
                      Published (Visible on site)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                      <input
                        type="checkbox"
                        checked={editingProject.featured ?? false}
                        onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                      />
                      Featured Badge
                    </label>
                  </div>
                </>
              )}

              {/* French Translations Tab */}
              {activeTab === 'fr' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Titre (FR)</label>
                    <input
                      type="text"
                      value={editingProject.title_fr || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, title_fr: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Résumé (FR)</label>
                    <input
                      type="text"
                      value={editingProject.tagline_fr || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, tagline_fr: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Contexte & Problème (FR)</label>
                    <textarea
                      rows={3}
                      value={editingProject.context_fr || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, context_fr: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                    />
                  </div>
                </div>
              )}

              {/* Arabic Translations Tab */}
              {activeTab === 'ar' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} dir="rtl">
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>العنوان (عربي)</label>
                    <input
                      type="text"
                      value={editingProject.title_ar || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, title_ar: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>الملخص (عربي)</label>
                    <input
                      type="text"
                      value={editingProject.tagline_ar || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, tagline_ar: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>السياق والمشكلة (عربي)</label>
                    <textarea
                      rows={3}
                      value={editingProject.context_ar || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, context_ar: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-ink)', border: '1px solid var(--border-color)', color: 'var(--color-bone)', marginTop: '0.25rem' }}
                    />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setEditingProject(null)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-saffron">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
