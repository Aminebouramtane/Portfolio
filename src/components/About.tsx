import React from 'react';
import { MapPin, GraduationCap, Briefcase, Languages } from 'lucide-react';
import { Settings } from '../services/api';
import { Language, Translations, getLocalized } from '../i18n/translations';

interface AboutProps {
  settings: Settings;
  lang: Language;
  t: Translations;
}

export const About: React.FC<AboutProps> = ({ settings, lang, t }) => {
  const bio = getLocalized(settings, 'bio', lang);
  const aboutText = getLocalized(settings, 'about', lang);

  const facts = [
    { icon: <MapPin size={18} className="text-saffron" />, label: t.about.location, val: settings.location },
    { icon: <GraduationCap size={18} className="text-saffron" />, label: t.about.education, val: 'Master\'s in AI & Data Science (Cadi Ayyad University)' },
    { icon: <Briefcase size={18} className="text-saffron" />, label: t.about.experience, val: '6 Months Professional Data Analyst Experience' },
    { icon: <Languages size={18} className="text-saffron" />, label: t.about.languages, val: 'Arabic (Native), English (Fluent), French (B2)' }
  ];

  return (
    <section id="about" style={{ paddingBlock: '6rem 4rem', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            03 / {t.about.title}
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800, marginTop: '0.5rem' }}>
            {t.about.title}
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'start'
          }}
          className="about-grid"
        >
          {/* Main Large Paragraph */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p
              style={{
                fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                lineHeight: 1.6,
                fontWeight: 600,
                color: 'var(--color-bone)'
              }}
            >
              {bio}
            </p>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: 'var(--color-slate)'
              }}
            >
              {aboutText}
            </p>
          </div>

          {/* Quick Facts List Card */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-saffron)' }}>
              {t.about.quickFacts}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {facts.map((fact, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(255, 178, 30, 0.1)', flexShrink: 0 }}>
                    {fact.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-slate)', display: 'block', fontWeight: 600 }}>
                      {fact.label}
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-bone)' }}>
                      {fact.val}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 1.4fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
