import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Language, Translations } from '../i18n/translations';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface NotFoundPageProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  t: Translations;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  lang,
  onLanguageChange,
  theme,
  onThemeToggle,
  t
}) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-ink)', color: 'var(--color-bone)', display: 'flex', flexDirection: 'column' }}>
      <Header lang={lang} onLanguageChange={onLanguageChange} theme={theme} onThemeToggle={onThemeToggle} t={t} />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBlock: '6rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <span style={{ fontSize: '7rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--color-saffron)', lineHeight: 1, display: 'block' }}>
            404
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginTop: '1rem' }}>
            Page Not Found
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-slate)', marginTop: '0.75rem', marginBottom: '2rem' }}>
            The page you are looking for does not exist or has been moved.
          </p>
          <Link to="/" className="btn btn-saffron">
            <Home size={18} />
            Return to Homepage
          </Link>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
};
