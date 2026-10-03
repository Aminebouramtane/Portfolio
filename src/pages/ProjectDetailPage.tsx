import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ChevronRight, X, ZoomIn } from 'lucide-react';
import { api, Project, GalleryItem } from '../services/api';

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
import { Language, Translations, getLocalized } from '../i18n/translations';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface ProjectDetailPageProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  t: Translations;
}

// Simple safe markdown to JSX renderer (sanitizes & avoids dangerouslySetInnerHTML)
function RenderMarkdown({ content }: { content: string }) {
  if (!content) return null;
  
  const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', lineHeight: 1.7, fontSize: '1.1rem', color: 'var(--color-slate)' }}>
      {paragraphs.map((para, i) => {
        if (para.startsWith('# ')) {
          return <h2 key={i} style={{ fontSize: '1.8rem', color: 'var(--color-bone)', fontWeight: 800 }}>{para.replace('# ', '')}</h2>;
        }
        if (para.startsWith('## ')) {
          return <h3 key={i} style={{ fontSize: '1.4rem', color: 'var(--color-bone)', fontWeight: 800 }}>{para.replace('## ', '')}</h3>;
        }
        if (para.startsWith('- ') || para.startsWith('* ')) {
          const items = para.split('\n').map(item => item.replace(/^[-*]\s*/, ''));
          return (
            <ul key={i} style={{ paddingInlineStart: '1.5rem', margin: 0 }}>
              {items.map((it, idx) => <li key={idx}>{it}</li>)}
            </ul>
          );
        }
        return <p key={i}>{para}</p>;
      })}
    </div>
  );
}

// Animated Counter Component for Key Metrics
function MetricCounter({ value, label }: { value: string; label: string }) {
  const [displayVal, setDisplayVal] = useState<string>('0');
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const numericMatch = value.match(/\d+/);
    if (!numericMatch) {
      setDisplayVal(value);
      return;
    }

    const targetNum = parseInt(numericMatch[0], 10);
    const prefix = value.substring(0, value.indexOf(numericMatch[0]));
    const suffix = value.substring(value.indexOf(numericMatch[0]) + numericMatch[0].length);

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        let start = 0;
        const duration = 1200;
        const startTime = performance.now();

        const updateVal = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          const current = Math.floor(progress * targetNum);
          setDisplayVal(`${prefix}${current}${suffix}`);

          if (progress < 1) {
            requestAnimationFrame(updateVal);
          } else {
            setDisplayVal(value);
          }
        };

        requestAnimationFrame(updateVal);
      }
    }, { threshold: 0.2 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        textAlign: 'center'
      }}
    >
      <span style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--color-saffron)', display: 'block', lineHeight: 1 }}>
        {hasAnimated ? displayVal : '0'}
      </span>
      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-slate)', marginTop: '0.5rem', display: 'block' }}>
        {label}
      </span>
    </div>
  );
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  lang,
  onLanguageChange,
  theme,
  onThemeToggle,
  t
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImg, setLightboxImg] = useState<GalleryItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    if (!slug) return;

    // Load site data for all projects & current project
    Promise.all([
      api.getProjectBySlug(slug),
      api.getSiteData()
    ]).then(([projData, siteData]) => {
      setProject(projData);
      setAllProjects(siteData.projects);
      setLoading(false);

      // Track page view ping
      api.trackPage(`/projects/${slug}`);

      // Dynamic Title & Open Graph updating
      document.title = `${projData.title} | Amine Bouramtane`;
    }).catch(() => {
      setLoading(false);
    });
  }, [slug]);

  // ESC key listener for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImg(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-ink)' }}>
        <Header lang={lang} onLanguageChange={onLanguageChange} theme={theme} onThemeToggle={onThemeToggle} t={t} />
        <div className="container" style={{ paddingBlock: '8rem', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid var(--border-color)', borderTopColor: 'var(--color-saffron)', borderRadius: '50%', margin: '0 auto 1.5rem', animation: 'spin 1s linear infinite' }} />
          <p style={{ color: 'var(--color-slate)' }}>Loading project details...</p>
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-ink)' }}>
        <Header lang={lang} onLanguageChange={onLanguageChange} theme={theme} onThemeToggle={onThemeToggle} t={t} />
        <div className="container" style={{ paddingBlock: '8rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', color: 'var(--color-saffron)', marginBottom: '1rem' }}>404</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-slate)', marginBottom: '2rem' }}>Project not found.</p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={18} />
            {t.projectDetail.backToProjects}
          </Link>
        </div>
        <Footer t={t} />
      </div>
    );
  }

  // Localized string values
  const title = getLocalized(project, 'title', lang);
  const tagline = getLocalized(project, 'tagline', lang);
  const description = getLocalized(project, 'description', lang);
  const context = getLocalized(project, 'context', lang);
  const approach = getLocalized(project, 'approach', lang);
  const results = getLocalized(project, 'results', lang);
  const learned = getLocalized(project, 'learned', lang);

  // Next Project computation
  const currentIndex = allProjects.findIndex(p => p.slug === project.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-ink)', color: 'var(--color-bone)' }}>
      <Header lang={lang} onLanguageChange={onLanguageChange} theme={theme} onThemeToggle={onThemeToggle} t={t} />

      <main id="main-content">
        {/* Project Header Banner */}
        <section style={{ paddingBlock: '4rem 3rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
          <div className="container">
            {/* Back Button */}
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-slate)',
                textDecoration: 'none',
                fontSize: '0.925rem',
                fontWeight: 600,
                marginBottom: '2rem',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-saffron)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-slate)')}
            >
              <ArrowLeft size={18} />
              {t.projectDetail.backToProjects}
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--color-saffron)', fontWeight: 700 }}>
              <span>{project.category}</span>
              <span>•</span>
              <span>{project.year}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '1.25rem' }}>
              {title}
            </h1>

            <p style={{ fontSize: '1.25rem', color: 'var(--color-slate)', maxWidth: '850px', marginBottom: '2rem', lineHeight: 1.6 }}>
              {tagline}
            </p>

            {/* Action Buttons & Tech Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-saffron">
                    <ExternalLink size={18} />
                    {t.work.viewLive}
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    <GithubIcon size={18} />
                    {t.work.viewCode}
                  </a>
                )}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.tech.map((tool, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-full)',
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
          </div>
        </section>

        {/* Cover Image & Gallery Section */}
        <section style={{ paddingBlock: '3rem', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container">
            <div
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-card)',
                position: 'relative',
                cursor: 'pointer'
              }}
              onClick={() => setLightboxImg({ url: project.image, alt: title })}
            >
              <img
                src={project.image}
                alt={title}
                width={1200}
                height={600}
                style={{ width: '100%', height: 'auto', maxHeight: '560px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: 'rgba(7, 8, 12, 0.8)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-bone)' }}>
                <ZoomIn size={16} />
                Click to expand
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {project.gallery && project.gallery.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                {project.gallery.map((g, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxImg(g)}
                    style={{
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      height: '140px'
                    }}
                  >
                    <img src={g.url} alt={g.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Key Metrics Counter Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <section style={{ paddingBlock: '4rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
            <div className="container">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center', color: 'var(--color-bone)' }}>
                {t.projectDetail.keyMetrics}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                {project.metrics.map((m, idx) => (
                  <MetricCounter key={idx} value={m.value} label={m.label} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Case Study Details Section */}
        <section style={{ paddingBlock: '5rem 4rem', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            {context ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
                {/* Context */}
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-saffron)', marginBottom: '1rem' }}>
                    {t.projectDetail.context}
                  </h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--color-slate)', lineHeight: 1.7 }}>
                    {context}
                  </p>
                </div>

                {/* Approach */}
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-saffron)', marginBottom: '1rem' }}>
                    {t.projectDetail.approach}
                  </h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--color-slate)', lineHeight: 1.7 }}>
                    {approach}
                  </p>
                </div>

                {/* Results */}
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-saffron)', marginBottom: '1rem' }}>
                    {t.projectDetail.results}
                  </h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--color-slate)', lineHeight: 1.7 }}>
                    {results}
                  </p>
                </div>

                {/* What I Learned */}
                {learned && (
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-saffron)', marginBottom: '1rem' }}>
                      {t.projectDetail.learned}
                    </h3>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-slate)', lineHeight: 1.7 }}>
                      {learned}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <RenderMarkdown content={description} />
            )}
          </div>
        </section>

        {/* Next Project Navigator */}
        {nextProject && (
          <section style={{ paddingBlock: '4rem', backgroundColor: 'var(--bg-card)' }}>
            <div className="container">
              <div
                onClick={() => navigate(`/projects/${nextProject.slug}`)}
                style={{
                  padding: '3rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-ink)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '2rem',
                  transition: 'all var(--transition-fast)'
                }}
                className="next-project-card"
              >
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-saffron)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {t.projectDetail.nextProject}
                  </span>
                  <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, marginTop: '0.5rem' }}>
                    {getLocalized(nextProject, 'title', lang)}
                  </h3>
                </div>
                <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', flexShrink: 0 }}>
                  <ChevronRight size={24} />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(7, 8, 12, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-label="Image Lightbox"
        >
          <button
            onClick={() => setLightboxImg(null)}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '0.5rem' }}
            aria-label="Close Lightbox"
          >
            <X size={32} />
          </button>
          <img
            src={lightboxImg.url}
            alt={lightboxImg.alt}
            style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 'var(--radius-md)' }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer t={t} />

      <style>{`
        .next-project-card:hover {
          border-color: var(--color-saffron) !important;
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  );
};
