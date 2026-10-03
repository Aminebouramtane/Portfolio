import React from 'react';
import { Skill } from '../services/api';
import { Translations } from '../i18n/translations';

interface ToolkitProps {
  skills: Skill[];
  t: Translations;
}

export const Toolkit: React.FC<ToolkitProps> = ({ skills, t }) => {
  // Group skills by category
  const groupedSkills: Record<string, Skill[]> = {};
  skills.forEach((s) => {
    if (!groupedSkills[s.grp]) {
      groupedSkills[s.grp] = [];
    }
    groupedSkills[s.grp].push(s);
  });

  return (
    <section id="toolkit" style={{ paddingBlock: '6rem 4rem', backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            04 / {t.toolkit.title}
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800, marginTop: '0.5rem' }}>
            {t.toolkit.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-slate)', maxWidth: '600px', marginTop: '0.5rem' }}>
            {t.toolkit.subtitle}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {Object.entries(groupedSkills).map(([group, groupSkills]) => (
            <div key={group}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-saffron)', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                {group}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {groupSkills.map((skill) => (
                  <div
                    key={skill.id}
                    style={{
                      padding: '0.65rem 1.25rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-color-strong)',
                      backgroundColor: 'var(--bg-ink)',
                      color: 'var(--color-bone)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all var(--transition-fast)'
                    }}
                    className="skill-chip"
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} aria-hidden="true" />
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skill-chip:hover {
          border-color: var(--color-saffron) !important;
          color: var(--color-saffron) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};
