export interface ProjectMetric {
  label: string;
  value: string;
}

export interface GalleryItem {
  url: string;
  alt: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  title_fr?: string;
  title_ar?: string;
  tagline: string;
  tagline_fr?: string;
  tagline_ar?: string;
  description: string;
  description_fr?: string;
  description_ar?: string;
  context?: string;
  context_fr?: string;
  context_ar?: string;
  approach?: string;
  approach_fr?: string;
  approach_ar?: string;
  results?: string;
  results_fr?: string;
  results_ar?: string;
  learned?: string;
  learned_fr?: string;
  learned_ar?: string;
  category: string;
  tech: string[];
  metrics: ProjectMetric[];
  year: number;
  image: string;
  gallery: GalleryItem[];
  link?: string;
  repo?: string;
  featured: boolean;
  published: boolean;
  draft: boolean;
  sort_order?: number;
}

export interface Skill {
  id: string;
  grp: string;
  name: string;
  sort_order?: number;
}

export interface TimelineItem {
  id: string;
  kind: 'work' | 'education';
  role: string;
  role_fr?: string;
  role_ar?: string;
  org: string;
  place: string;
  period: string;
  details: string;
  details_fr?: string;
  details_ar?: string;
  sort_order?: number;
}

export interface Settings {
  name: string;
  title: string;
  title_fr?: string;
  title_ar?: string;
  headline: string;
  headline_fr?: string;
  headline_ar?: string;
  bio: string;
  bio_fr?: string;
  bio_ar?: string;
  about: string;
  about_fr?: string;
  about_ar?: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  photo: string;
  availability: string;
  availability_fr?: string;
  availability_ar?: string;
  cv_url: string;
}

export interface SiteData {
  settings: Settings;
  projects: Project[];
  skills: Skill[];
  timeline: TimelineItem[];
}

export interface MessageItem {
  id: string;
  name: string;
  email: string;
  body: string;
  read: boolean;
  date: string;
}

export interface AdminStats {
  counts: {
    projects: number;
    visible: number;
    featured: number;
    unreadMessages: number;
  };
  viewsByDay: Array<{ date: string; views: number }>;
  topProjects: Array<{ slug: string; title: string; views: number }>;
}

const API_BASE = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('admin_token');
  const sessionId = localStorage.getItem('admin_session');
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'x-session-id': sessionId || '',
    'Content-Type': 'application/json'
  };
}

export const api = {
  async getSiteData(): Promise<SiteData> {
    const res = await fetch(`${API_BASE}/site`);
    if (!res.ok) throw new Error('Failed to load site data');
    return res.json();
  },

  async getProjectBySlug(slug: string): Promise<Project> {
    const res = await fetch(`${API_BASE}/projects/${slug}`);
    if (!res.ok) throw new Error('Project not found');
    return res.json();
  },

  async sendContact(data: { name: string; email: string; body: string; website?: string }) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to send message');
    }
    return res.json();
  },

  async trackPage(path: string) {
    try {
      await fetch(`${API_BASE}/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path })
      });
    } catch {
      // Ignore ping errors
    }
  },

  // Admin methods
  async login(password: string) {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    if (!res.ok) throw new Error('Invalid password');
    const data = await res.json();
    localStorage.setItem('admin_token', data.token);
    localStorage.setItem('admin_session', data.sessionId);
    return data;
  },

  async logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_session');
    await fetch(`${API_BASE}/logout`, { method: 'POST' }).catch(() => {});
  },

  async checkAuth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/me`, { headers: getAuthHeader() });
      if (!res.ok) return false;
      const data = await res.json();
      return !!data.authenticated;
    } catch {
      return false;
    }
  },

  async getAdminStats(): Promise<AdminStats> {
    const res = await fetch(`${API_BASE}/admin/stats`, { headers: getAuthHeader() });
    if (!res.ok) throw new Error('Failed to load stats');
    return res.json();
  },

  async getAdminProjects(): Promise<Project[]> {
    const res = await fetch(`${API_BASE}/admin/projects`, { headers: getAuthHeader() });
    if (!res.ok) throw new Error('Failed to load projects');
    return res.json();
  },

  async saveProject(project: Partial<Project>): Promise<Project> {
    const isEdit = !!project.id;
    const url = isEdit ? `${API_BASE}/admin/projects/${project.id}` : `${API_BASE}/admin/projects`;
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: getAuthHeader(),
      body: JSON.stringify(project)
    });
    if (!res.ok) throw new Error('Failed to save project');
    return res.json();
  },

  async reorderProjects(ids: string[]) {
    const res = await fetch(`${API_BASE}/admin/projects/reorder`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify({ ids })
    });
    if (!res.ok) throw new Error('Failed to reorder projects');
    return res.json();
  },

  async deleteProject(id: string) {
    const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to delete project');
    return res.json();
  },

  async getAdminSkills(): Promise<Skill[]> {
    const res = await fetch(`${API_BASE}/admin/skills`, { headers: getAuthHeader() });
    return res.json();
  },

  async saveSkill(skill: Partial<Skill>): Promise<Skill> {
    const isEdit = !!skill.id;
    const url = isEdit ? `${API_BASE}/admin/skills/${skill.id}` : `${API_BASE}/admin/skills`;
    const res = await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(skill)
    });
    return res.json();
  },

  async deleteSkill(id: string) {
    const res = await fetch(`${API_BASE}/admin/skills/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return res.json();
  },

  async getAdminTimeline(): Promise<TimelineItem[]> {
    const res = await fetch(`${API_BASE}/admin/timeline`, { headers: getAuthHeader() });
    return res.json();
  },

  async saveTimelineItem(item: Partial<TimelineItem>): Promise<TimelineItem> {
    const isEdit = !!item.id;
    const url = isEdit ? `${API_BASE}/admin/timeline/${item.id}` : `${API_BASE}/admin/timeline`;
    const res = await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(item)
    });
    return res.json();
  },

  async deleteTimelineItem(id: string) {
    const res = await fetch(`${API_BASE}/admin/timeline/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return res.json();
  },

  async getAdminSettings(): Promise<Settings> {
    const res = await fetch(`${API_BASE}/admin/settings`, { headers: getAuthHeader() });
    return res.json();
  },

  async saveSettings(settings: Partial<Settings>): Promise<Settings> {
    const res = await fetch(`${API_BASE}/admin/settings`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(settings)
    });
    return res.json();
  },

  async getAdminMessages(): Promise<MessageItem[]> {
    const res = await fetch(`${API_BASE}/admin/messages`, { headers: getAuthHeader() });
    return res.json();
  },

  async markMessageRead(id: string, read: boolean) {
    const res = await fetch(`${API_BASE}/admin/messages/${id}/read`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify({ read })
    });
    return res.json();
  },

  async deleteMessage(id: string) {
    const res = await fetch(`${API_BASE}/admin/messages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return res.json();
  },

  async uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('admin_token');
    const sessionId = localStorage.getItem('admin_session');
    const res = await fetch(`${API_BASE}/admin/upload`, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'x-session-id': sessionId || ''
      },
      body: formData
    });
    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    return data.url;
  },

  async updatePassword(newPassword: string) {
    const res = await fetch(`${API_BASE}/admin/password`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify({ newPassword })
    });
    if (!res.ok) throw new Error('Password change failed');
    return res.json();
  },

  async exportBackup() {
    const res = await fetch(`${API_BASE}/admin/export`, { headers: getAuthHeader() });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio_backup.json';
    a.click();
    window.URL.revokeObjectURL(url);
  },

  async importBackup(data: any) {
    const res = await fetch(`${API_BASE}/admin/import`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Import failed');
    return res.json();
  }
};
