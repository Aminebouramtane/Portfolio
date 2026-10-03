import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { TimelineItem } from '../services/api';
import { Language, Translations, getLocalized } from '../i18n/translations';

interface PathTimelineProps {
  timeline: TimelineItem[];
  lang: Language;
  t: Translations;
}

export const PathTimeline: React.FC<PathTimelineProps> = ({ timeline, lang, t }) => {
  const workItems = timeline.filter((item) => item.kind === 'work');
  const eduItems = timeline.filter((item) => item.kind === 'education');

  const renderTimelineColumn = (items: TimelineItem[], title: string, icon: React.ReactNode) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(47, 69, 255, 0.15)', color: 'var(--color-primary)' }}>
          {icon}
        </div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{title}</h3>
      </div>

      <div style={{ position: 'relative', paddingInlineStart: '1.75rem', borderInlineStart: '2px solid var(--border-color-strong)' }}>
        {items.map((item) => {
          const role = getLocalized(item, 'role', lang);
          const details = getLocalized(item, 'details', lang);
          const bullets = details.split('\n').filter((b) => b.trim() !== '');

          return (
            <div key={item.id} style={{ position: 'relative', marginBottom: '2.5rem' }}>
              {/* Timeline Dot Node */}
              <div
                style={{
                  position: 'absolute',
                  top: '0.2rem',
                  insetInlineStart: '-2.35rem',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-saffron)',
                  border: '3px solid var(--bg-ink)'
                }}
              />

              {/* Card Container */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-bone)' }}>
                    {role}
                  </h4>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--color-saffron)',
                      backgroundColor: 'rgba(255, 178, 30, 0.12)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <Calendar size={12} />
                    {item.period}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: 'var(--color-slate)' }}>
                  <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{item.org}</span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={13} />
                    {item.place}
                  </span>
                </div>

                {/* Bullet details */}
                <ul style={{ paddingInlineStart: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {bullets.map((bullet, idx) => (
                    <li key={idx} style={{ fontSize: '0.925rem', color: 'var(--color-slate)', lineHeight: 1.5 }}>
                      {bullet.replace(/^•\s*/, '')}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section id="path" style={{ paddingBlock: '6rem 4rem', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            05 / {t.path.title}
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800, marginTop: '0.5rem' }}>
            {t.path.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-slate)', maxWidth: '600px', marginTop: '0.5rem' }}>
            {t.path.subtitle}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3.5rem'
          }}
          className="timeline-grid"
        >
          {renderTimelineColumn(workItems, t.path.experience, <Briefcase size={22} />)}
          {renderTimelineColumn(eduItems, t.path.education, <GraduationCap size={22} />)}
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .timeline-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
