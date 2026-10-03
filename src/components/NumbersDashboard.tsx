import React, { useState } from 'react';
import { BarChart3, Wrench, Layers } from 'lucide-react';
import { Project, Skill } from '../services/api';
import { Translations } from '../i18n/translations';

interface NumbersDashboardProps {
  projects: Project[];
  skills: Skill[];
  t: Translations;
  onSelectCategory: (category: string) => void;
}

export const NumbersDashboard: React.FC<NumbersDashboardProps> = ({
  projects,
  skills,
  t,
  onSelectCategory
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // 1. Projects per category computation
  const categoryCounts: Record<string, number> = {};
  projects.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });
  const categoryList = Object.entries(categoryCounts).map(([cat, count]) => ({
    name: cat,
    count
  }));
  const maxCategoryCount = Math.max(1, ...categoryList.map((c) => c.count));

  // 2. Tools frequency across projects computation
  const toolCounts: Record<string, number> = {};
  projects.forEach((p) => {
    p.tech.forEach((tech) => {
      toolCounts[tech] = (toolCounts[tech] || 0) + 1;
    });
  });
  const topTools = Object.entries(toolCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([tool, count]) => ({ tool, count }));
  const maxToolCount = Math.max(1, ...topTools.map((tItem) => tItem.count));

  // 3. Skills count by group computation
  const skillGroupCounts: Record<string, number> = {};
  skills.forEach((s) => {
    skillGroupCounts[s.grp] = (skillGroupCounts[s.grp] || 0) + 1;
  });
  const skillGroups = Object.entries(skillGroupCounts).map(([grp, count]) => ({
    grp,
    count
  }));

  return (
    <section id="numbers" style={{ paddingBlock: '6rem 4rem', backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            02 / {t.numbers.title}
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.25rem)', fontWeight: 800, marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            {t.numbers.title}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-slate)', maxWidth: '600px', margin: 0, lineHeight: 1.6 }}>
            {t.numbers.subtitle}
          </p>
        </div>

        {/* Dashboard Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem'
          }}
          className="dashboard-main-grid"
        >
          {/* Top Row: Category Bar Chart + Tool Frequency */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2rem'
            }}
            className="dashboard-top-row"
          >
            {/* Chart 1: Projects Per Category (Interactive Bar Cards) */}
            <div
              style={{
                backgroundColor: 'var(--bg-ink)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(255, 178, 30, 0.1)', color: 'var(--color-saffron)' }}>
                    <BarChart3 size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{t.numbers.byCategory}</h3>
                </div>

                {/* Custom Styled Visual Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
                  {categoryList.map((item) => {
                    const pct = (item.count / maxCategoryCount) * 100;
                    const isHovered = hoveredCategory === item.name;

                    return (
                      <div
                        key={item.name}
                        onClick={() => onSelectCategory(item.name)}
                        onMouseEnter={() => setHoveredCategory(item.name)}
                        onMouseLeave={() => setHoveredCategory(null)}
                        style={{
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.35rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                          <span style={{ fontWeight: 700, color: isHovered ? 'var(--color-saffron)' : 'var(--color-bone)', transition: 'color var(--transition-fast)' }}>
                            {item.name}
                          </span>
                          <span style={{ fontWeight: 800, color: 'var(--color-saffron)' }}>
                            {item.count} {t.numbers.projectsCount}
                          </span>
                        </div>
                        <div style={{ width: '100%', height: '10px', backgroundColor: 'rgba(236, 235, 227, 0.08)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${pct}%`,
                              height: '100%',
                              backgroundColor: isHovered ? 'var(--color-saffron)' : 'var(--color-primary)',
                              borderRadius: 'var(--radius-full)',
                              transition: 'all 0.3s ease-out'
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--color-slate)', marginTop: '2rem', fontStyle: 'italic', margin: '2rem 0 0' }}>
                💡 Click any category bar to filter Selected Work projects
              </p>
            </div>

            {/* Chart 2: Tool Frequency Across Projects */}
            <div
              style={{
                backgroundColor: 'var(--bg-ink)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                padding: '2rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(47, 69, 255, 0.15)', color: 'var(--color-primary)' }}>
                  <Wrench size={20} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{t.numbers.byTool}</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {topTools.map((tItem) => {
                  const pct = (tItem.count / maxToolCount) * 100;
                  return (
                    <div key={tItem.tool}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.3rem' }}>
                        <span style={{ fontWeight: 600, color: 'var(--color-bone)' }}>{tItem.tool}</span>
                        <span style={{ color: 'var(--color-saffron)', fontWeight: 700 }}>{tItem.count} {t.numbers.projectsCount}</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(236, 235, 227, 0.08)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${pct}%`,
                            height: '100%',
                            backgroundColor: 'var(--color-saffron)',
                            borderRadius: 'var(--radius-full)',
                            transition: 'width 0.8s ease-out'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Row: Skills Count By Group Cards */}
          <div
            style={{
              backgroundColor: 'var(--bg-ink)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              padding: '2rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(255, 178, 30, 0.1)', color: 'var(--color-saffron)' }}>
                <Layers size={20} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{t.numbers.bySkillGroup}</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
              {skillGroups.map((sg) => (
                <div
                  key={sg.grp}
                  style={{
                    backgroundColor: 'rgba(47, 69, 255, 0.06)',
                    border: '1px solid rgba(47, 69, 255, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    textAlign: 'center',
                    transition: 'all var(--transition-fast)'
                  }}
                  className="skill-group-card"
                >
                  <span style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--color-saffron)', display: 'block', lineHeight: 1 }}>
                    {sg.count}
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-bone)', marginTop: '0.5rem', display: 'block' }}>
                    {sg.grp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visually Hidden Accessibility Table Fallback for Screen Readers */}
        <table className="sr-only" aria-label="Analytics summary table">
          <caption>Analytics data summary for assistive technologies</caption>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Projects Count</th>
            </tr>
          </thead>
          <tbody>
            {categoryList.map((c) => (
              <tr key={c.name}>
                <td>{c.name}</td>
                <td>{c.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .skill-group-card:hover {
          border-color: var(--color-saffron) !important;
          transform: translateY(-3px);
        }
        @media (min-width: 992px) {
          .dashboard-top-row {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
