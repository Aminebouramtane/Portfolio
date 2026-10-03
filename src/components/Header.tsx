import React, { useState } from 'react';
import { Globe, Sun, Moon, Menu, X } from 'lucide-react';
import { Language, Translations } from '../i18n/translations';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  t: Translations;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  theme,
  onThemeToggle,
  t
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t.nav.work, href: '#work' },
    { label: t.nav.numbers, href: '#numbers' },
    { label: t.nav.toolkit, href: '#toolkit' },
    { label: t.nav.path, href: '#path' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'background-color var(--transition-normal)'
      }}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.5rem' }}>
        {/* Brand Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            color: 'var(--color-bone)'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, var(--color-bone) 30%, var(--color-saffron))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            AMINE BOURAMTANE
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2rem'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: 'var(--color-slate)',
                textDecoration: 'none',
                fontSize: '0.925rem',
                fontWeight: 600,
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-bone)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-slate)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions Controls (Language, Theme, CTA) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(236, 235, 227, 0.06)', padding: '0.25rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
            <Globe size={15} style={{ marginInline: '0.35rem', color: 'var(--color-slate)' }} aria-hidden="true" />
            {(['en', 'fr', 'ar'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => onLanguageChange(l)}
                style={{
                  background: lang === l ? 'var(--color-primary)' : 'transparent',
                  color: lang === l ? '#ffffff' : 'var(--color-slate)',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all var(--transition-fast)'
                }}
                aria-label={`Switch to ${l.toUpperCase()}`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            style={{
              background: 'rgba(236, 235, 227, 0.06)',
              border: '1px solid var(--border-color)',
              color: 'var(--color-bone)',
              borderRadius: '50%',
              width: '2.4rem',
              height: '2.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} className="text-saffron" /> : <Moon size={18} className="text-cobalt" />}
          </button>

          {/* Get in touch CTA */}
          <a
            href="#contact"
            className="btn btn-saffron"
            style={{
              display: 'none',
              padding: '0.55rem 1.25rem',
              fontSize: '0.875rem'
            }}
            className-desktop="desktop-cta"
          >
            {t.nav.contact}
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              background: 'transparent',
              border: 'none',
              color: 'var(--color-bone)',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
            className="mobile-toggle"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
          className="mobile-menu"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: 'var(--color-bone)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: 700
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-saffron"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            {t.nav.contact}
          </a>
        </div>
      )}

      {/* Responsive Inline Media CSS */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: inline-flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};
