import React from 'react';
import { Mail, Trash2, CheckCircle2, Circle, ExternalLink } from 'lucide-react';
import { api, MessageItem } from '../../services/api';

interface AdminMessagesProps {
  messages: MessageItem[];
  onRefresh: () => void;
  onShowToast: (msg: string) => void;
}

export const AdminMessages: React.FC<AdminMessagesProps> = ({ messages, onRefresh, onShowToast }) => {
  const handleToggleRead = async (id: string, currentRead: boolean) => {
    try {
      await api.markMessageRead(id, !currentRead);
      onShowToast(!currentRead ? 'Message marked as read' : 'Message marked as unread');
      onRefresh();
    } catch {
      alert('Failed to update message');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.deleteMessage(id);
      onShowToast('Message deleted');
      onRefresh();
    } catch {
      alert('Failed to delete message');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Contact Messages</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-slate)' }}>Total {messages.length} messages</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.length === 0 ? (
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '3rem', textAlign: 'center', borderRadius: 'var(--radius-lg)', color: 'var(--color-slate)' }}>
            No contact messages received yet.
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid ' + (m.read ? 'var(--border-color)' : 'var(--color-saffron)'),
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-bone)' }}>{m.name}</span>
                    {!m.read && (
                      <span style={{ fontSize: '0.72rem', backgroundColor: 'rgba(255, 178, 30, 0.2)', color: 'var(--color-saffron)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-sm)', fontWeight: 700 }}>New</span>
                    )}
                  </div>
                  <a href={`mailto:${m.email}`} style={{ fontSize: '0.9rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
                    {m.email}
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-slate)' }}>{new Date(m.date).toLocaleDateString()}</span>
                  <button
                    onClick={() => handleToggleRead(m.id, m.read)}
                    title={m.read ? 'Mark Unread' : 'Mark Read'}
                    style={{ background: 'transparent', border: 'none', color: m.read ? 'var(--color-slate)' : 'var(--color-saffron)', cursor: 'pointer', padding: '0.35rem' }}
                  >
                    {m.read ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </button>
                  <a
                    href={`mailto:${m.email}?subject=RE: Amine Bouramtane Portfolio`}
                    className="btn btn-outline"
                    style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', gap: '0.35rem' }}
                  >
                    <Mail size={14} />
                    Reply
                  </a>
                  <button
                    onClick={() => handleDelete(m.id)}
                    style={{ background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#ef4444', padding: '0.4rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p style={{ fontSize: '1rem', color: 'var(--color-bone)', lineHeight: 1.6, backgroundColor: 'var(--bg-ink)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                {m.body}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
