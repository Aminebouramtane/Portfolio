import React from 'react';
import { ArrowUp, Lock } from 'lucide-react';
import { Translations } from '../i18n/translations';

interface FooterProps {
  t: Translations;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: 'var(--bg-ink)', paddingBlock: '3rem 2rem', borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-slate)' }}>
            © {new Date().getFullYear()} Amine Bouramtane. {t.footer.rights}
          </p>
          <a
            href="/admin"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.8rem',
              color: 'var(--color-slate)',
              textDecoration: 'none',
              transition: 'color var(--transition-fast)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-saffron)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-slate)')}
          >
            <Lock size={13} />
            {t.nav.admin}
          </a>
        </div>

        <button
          onClick={scrollToTop}
          style={{
            background: 'rgba(236, 235, 227, 0.05)',
            border: '1px solid var(--border-color)',
            color: 'var(--color-bone)',
            borderRadius: 'var(--radius-full)',
            padding: '0.6rem 1.25rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all var(--transition-fast)'
          }}
          className="back-to-top"
          aria-label={t.footer.backToTop}
        >
          {t.footer.backToTop}
          <ArrowUp size={16} />
        </button>
      </div>

      <style>{`
        .back-to-top:hover {
          background-color: var(--color-primary) !important;
          border-color: var(--color-primary) !important;
          color: #ffffff !important;
        }
      `}</style>
    </footer>
  );
};
