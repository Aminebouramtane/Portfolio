import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Star } from 'lucide-react';
import { Project } from '../services/api';
import { Language, Translations, getLocalized } from '../i18n/translations';

interface SelectedWorkProps {
  projects: Project[];
  lang: Language;
  t: Translations;
  selectedCategoryFilter?: string | null;
  onClearCategoryFilter?: () => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  projects,
  lang,
  t,
  selectedCategoryFilter,
  onClearCategoryFilter
}) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];

  // Effective category filter
  const currentCategory = selectedCategoryFilter || activeCategory;

  const filteredProjects = projects.filter((p) => {
    if (currentCategory === 'all') return true;
    return p.category.toLowerCase() === currentCategory.toLowerCase();
  });

  return (
    <section id="work" style={{ paddingBlock: '6rem 4rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-ink)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              01 / {t.work.title}
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem' }}>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.25rem)', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
              {t.work.title}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-slate)', maxWidth: '520px', margin: 0, lineHeight: 1.6 }}>
              {t.work.subtitle}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1rem' }}>
            {categories.map((cat) => {
              const isSelected = currentCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => {
                    if (onClearCategoryFilter) onClearCategoryFilter();
                    setActiveCategory(cat);
                  }}
                  style={{
                    background: isSelected ? 'var(--color-primary)' : 'rgba(236, 235, 227, 0.04)',
                    color: isSelected ? '#ffffff' : 'var(--color-slate)',
                    border: '1px solid ' + (isSelected ? 'var(--color-primary)' : 'var(--border-color)'),
                    borderRadius: 'var(--radius-full)',
                    padding: '0.55rem 1.35rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {cat === 'all' ? t.work.all : cat}
                </button>
              );
            })}

            {selectedCategoryFilter && (
              <button
                onClick={onClearCategoryFilter}
                style={{
                  background: 'transparent',
                  color: 'var(--color-saffron)',
                  border: '1px dashed var(--color-saffron)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.55rem 1.35rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ✕ {t.numbers.resetFilter}
              </button>
            )}
          </div>
        </div>

        {/* Project Rows List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredProjects.length === 0 ? (
            <div style={{ padding: '4rem 1rem', textAlign: 'center', color: 'var(--color-slate)' }}>
              No projects found in this category.
            </div>
          ) : (
            filteredProjects.map((project) => {
              const localizedTitle = getLocalized(project, 'title', lang);
              const localizedTagline = getLocalized(project, 'tagline', lang);

              return (
                <article
                  key={project.id}
                  onClick={() => navigate(`/projects/${project.slug}`)}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    position: 'relative'
                  }}
                  className="project-card-row"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigate(`/projects/${project.slug}`);
                    }
                  }}
                  aria-label={`View ${localizedTitle} case study`}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Top Row: Year, Category, Featured badge, Arrow icon */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '0.875rem', color: 'var(--color-slate)' }}>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--color-bone)' }}>
                          {project.year}
                        </span>
                        <span>•</span>
                        <span style={{ color: 'var(--color-saffron)', fontWeight: 700 }}>
                          {project.category}
                        </span>
                        {project.featured && (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              background: 'rgba(255, 178, 30, 0.15)',
                              color: 'var(--color-saffron)',
                              padding: '0.15rem 0.6rem',
                              borderRadius: 'var(--radius-sm)',
                              fontSize: '0.75rem',
                              fontWeight: 700
                            }}
                          >
                            <Star size={12} fill="var(--color-saffron)" />
                            {t.work.featured}
                          </span>
                        )}
                      </div>

                      <div
                        style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          borderRadius: '50%',
                          border: '1px solid var(--border-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-bone)',
                          flexShrink: 0,
                          transition: 'all var(--transition-fast)'
                        }}
                        className="arrow-circle"
                      >
                        <ArrowUpRight size={18} />
                      </div>
                    </div>

                    {/* Middle Row: Title & Tagline */}
                    <div>
                      <h3
                        style={{
                          fontSize: 'clamp(1.35rem, 2.5vw, 2rem)',
                          fontWeight: 800,
                          letterSpacing: '-0.02em',
                          lineHeight: 1.25,
                          margin: 0,
                          color: 'var(--color-bone)',
                          transition: 'color var(--transition-fast)'
                        }}
                        className="project-title"
                      >
                        {localizedTitle}
                      </h3>
                      <p style={{ fontSize: '1rem', color: 'var(--color-slate)', marginTop: '0.65rem', marginBottom: 0, lineHeight: 1.6, maxWidth: '820px' }}>
                        {localizedTagline}
                      </p>
                    </div>

                    {/* Bottom Row: Tech Chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.25rem' }}>
                      {project.tech.map((tool, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            padding: '0.3rem 0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--bg-ink)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--color-bone)'
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>

      <style>{`
        .project-card-row:hover {
          border-color: var(--color-saffron) !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.3);
        }
        .project-card-row:hover .project-title {
          color: var(--color-saffron) !important;
        }
        .project-card-row:hover .arrow-circle {
          background-color: var(--color-saffron) !important;
          color: #07080c !important;
          border-color: var(--color-saffron) !important;
          transform: translate(2px, -2px);
        }
      `}</style>
    </section>
  );
};
