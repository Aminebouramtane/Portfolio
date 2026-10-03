import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, Wrench, GraduationCap, User, MessageSquare, Database, Key, LogOut, ArrowLeft, Eye, EyeOff, Star, TrendingUp, BarChart2
} from 'lucide-react';
import { api, Project, Skill, TimelineItem, Settings, MessageItem, AdminStats } from '../services/api';
import { AdminProjects } from '../components/admin/AdminProjects';
import { AdminSkills } from '../components/admin/AdminSkills';
import { AdminTimeline } from '../components/admin/AdminTimeline';
import { AdminProfile } from '../components/admin/AdminProfile';
import { AdminMessages } from '../components/admin/AdminMessages';
import { AdminBackup } from '../components/admin/AdminBackup';
import { AdminAccount } from '../components/admin/AdminAccount';

type AdminTab = 'overview' | 'projects' | 'skills' | 'timeline' | 'profile' | 'messages' | 'backup' | 'account';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const loadData = async () => {
    try {
      const isAuth = await api.checkAuth();
      if (!isAuth) {
        navigate('/admin/login');
        return;
      }

      const [st, pr, sk, tm, se, ms] = await Promise.all([
        api.getAdminStats(),
        api.getAdminProjects(),
        api.getAdminSkills(),
        api.getAdminTimeline(),
        api.getAdminSettings(),
        api.getAdminMessages()
      ]);

      setStats(st);
      setProjects(pr);
      setSkills(sk);
      setTimeline(tm);
      setSettings(se);
      setMessages(ms);
      setLoading(false);
    } catch {
      navigate('/admin/login');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    await api.logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-slate)' }}>Loading Admin Console...</p>
      </div>
    );
  }

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-ink)', color: 'var(--color-bone)', display: 'flex' }}>
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            backgroundColor: 'var(--color-saffron)',
            color: '#07080c',
            padding: '0.85rem 1.5rem',
            borderRadius: 'var(--radius-full)',
            fontWeight: 800,
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            zIndex: 9999,
            animation: 'slideUp 0.3s ease-out'
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside
        style={{
          width: '260px',
          backgroundColor: 'var(--bg-card)',
          borderRight: '1px solid var(--border-color)',
          padding: '2rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <span style={{ fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--color-saffron)' }}>
              AMINE ADMIN
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-slate)', display: 'block', marginTop: '0.2rem' }}>
              Portfolio Control Panel
            </span>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {[
              { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
              { id: 'projects', label: 'Projects', icon: <FolderKanban size={18} /> },
              { id: 'skills', label: 'Skills', icon: <Wrench size={18} /> },
              { id: 'timeline', label: 'Timeline & Path', icon: <GraduationCap size={18} /> },
              { id: 'profile', label: 'Profile Settings', icon: <User size={18} /> },
              { id: 'messages', label: 'Messages', icon: <MessageSquare size={18} />, badge: unreadCount },
              { id: 'backup', label: 'Backup & Restore', icon: <Database size={18} /> },
              { id: 'account', label: 'Account', icon: <Key size={18} /> }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as AdminTab)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  backgroundColor: activeTab === item.id ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === item.id ? '#ffffff' : 'var(--color-slate)',
                  fontSize: '0.925rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {item.icon}
                  {item.label}
                </div>
                {item.badge ? (
                  <span style={{ backgroundColor: 'var(--color-saffron)', color: '#07080c', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 800 }}>
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-slate)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={16} />
            Back to Public Site
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: '#ef4444',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              padding: 0
            }}
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Overview Dashboard</h2>

            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-slate)', fontWeight: 600 }}>Total Projects</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-bone)', display: 'block', marginTop: '0.25rem' }}>{stats?.counts.projects}</span>
              </div>
              <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-slate)', fontWeight: 600 }}>Visible Public Projects</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#22c55e', display: 'block', marginTop: '0.25rem' }}>{stats?.counts.visible}</span>
              </div>
              <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-slate)', fontWeight: 600 }}>Featured Projects</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-saffron)', display: 'block', marginTop: '0.25rem' }}>{stats?.counts.featured}</span>
              </div>
              <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-slate)', fontWeight: 600 }}>Unread Messages</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)', display: 'block', marginTop: '0.25rem' }}>{stats?.counts.unreadMessages}</span>
              </div>
            </div>

            {/* Visit Analytics Sparkline / Bar Chart */}
            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <TrendingUp size={20} className="text-saffron" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Page Views (Last 30 Days)</h3>
              </div>
              <div style={{ height: '140px', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                {stats?.viewsByDay.map((d) => (
                  <div key={d.date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }} title={`${d.date}: ${d.views} views`}>
                    <div
                      style={{
                        width: '100%',
                        height: `${Math.min(120, d.views * 4)}px`,
                        backgroundColor: 'var(--color-primary)',
                        borderRadius: '2px 2px 0 0',
                        opacity: 0.85
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && <AdminProjects projects={projects} onRefresh={loadData} onShowToast={showToast} />}
        {activeTab === 'skills' && <AdminSkills skills={skills} onRefresh={loadData} onShowToast={showToast} />}
        {activeTab === 'timeline' && <AdminTimeline timeline={timeline} onRefresh={loadData} onShowToast={showToast} />}
        {activeTab === 'profile' && settings && <AdminProfile settings={settings} onRefresh={loadData} onShowToast={showToast} />}
        {activeTab === 'messages' && <AdminMessages messages={messages} onRefresh={loadData} onShowToast={showToast} />}
        {activeTab === 'backup' && <AdminBackup onRefresh={loadData} onShowToast={showToast} />}
        {activeTab === 'account' && <AdminAccount onShowToast={showToast} />}
      </main>

      <style>{`
        @keyframes slideUp { 0% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};
