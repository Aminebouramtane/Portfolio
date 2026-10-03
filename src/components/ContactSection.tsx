import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { api, Settings } from '../services/api';
import { Translations } from '../i18n/translations';

interface ContactSectionProps {
  settings: Settings;
  t: Translations;
}

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-saffron">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-saffron">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings, t }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: '',
    website: '' // honeypot
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.body) {
      setStatus({ type: 'error', msg: 'Please fill in all required fields.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await api.sendContact(formData);
      setStatus({ type: 'success', msg: t.contact.successMsg });
      setFormData({ name: '', email: '', body: '', website: '' });
    } catch (err: any) {
      setStatus({ type: 'error', msg: err.message || t.contact.errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const contactLinks = [
    { icon: <Mail size={20} className="text-saffron" />, label: 'Email', val: settings.email, href: `mailto:${settings.email}` },
    { icon: <LinkedinIcon size={20} />, label: 'LinkedIn', val: 'Amine Bouramtane', href: settings.linkedin },
    { icon: <GithubIcon size={20} />, label: 'GitHub', val: 'Aminebouramtane', href: settings.github },
    { icon: <Phone size={20} className="text-saffron" />, label: 'Phone', val: settings.phone, href: `tel:${settings.phone}` }
  ];

  return (
    <section id="contact" style={{ paddingBlock: '6rem 4rem', backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            06 / {t.contact.title}
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800, marginTop: '0.5rem' }}>
            {t.contact.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-slate)', maxWidth: '600px', marginTop: '0.5rem' }}>
            {t.contact.subtitle}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3.5rem'
          }}
          className="contact-grid"
        >
          {/* Quick Direct Links Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-bone)' }}>
              {t.contact.directContact}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {contactLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: 'var(--bg-ink)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    textDecoration: 'none',
                    color: 'var(--color-bone)',
                    transition: 'all var(--transition-fast)'
                  }}
                  className="contact-card"
                >
                  <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(255, 178, 30, 0.1)', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-slate)', display: 'block', fontWeight: 600 }}>
                      {item.label}
                    </span>
                    <span style={{ fontSize: '1rem', fontWeight: 700 }}>
                      {item.val}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Interactive Form Column */}
          <div
            style={{
              backgroundColor: 'var(--bg-ink)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem'
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Hidden Honeypot Field for Spambots */}
              <div style={{ display: 'none' }}>
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Status Alert Banner */}
              {status && (
                <div
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    backgroundColor: status.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid ' + (status.type === 'success' ? '#22c55e' : '#ef4444'),
                    color: status.type === 'success' ? '#22c55e' : '#ef4444',
                    fontSize: '0.925rem',
                    fontWeight: 600
                  }}
                >
                  {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                  <span>{status.msg}</span>
                </div>
              )}

              {/* Name Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="name" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-bone)' }}>
                  {t.contact.nameLabel} *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder={t.contact.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    color: 'var(--color-bone)',
                    fontSize: '1rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Email Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="email" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-bone)' }}>
                  {t.contact.emailLabel} *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder={t.contact.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    color: 'var(--color-bone)',
                    fontSize: '1rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Message Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="message" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-bone)' }}>
                  {t.contact.messageLabel} *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder={t.contact.messagePlaceholder}
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    color: 'var(--color-bone)',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-saffron"
                style={{
                  padding: '1rem',
                  fontSize: '1rem',
                  width: '100%',
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? (
                  t.contact.sending
                ) : (
                  <>
                    {t.contact.send}
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .contact-card:hover {
          border-color: var(--color-saffron) !important;
          transform: translateY(-2px);
        }
        @media (min-width: 992px) {
          .contact-grid {
            grid-template-columns: 0.9fr 1.3fr !important;
          }
        }
      `}</style>
    </section>
  );
};
