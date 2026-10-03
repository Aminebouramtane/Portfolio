import React from 'react';
import { ArrowDownRight, FileText, Sparkles } from 'lucide-react';
import { HeroCanvas } from './HeroCanvas';
import { Settings } from '../services/api';
import { Language, Translations, getLocalized } from '../i18n/translations';

interface HeroProps {
  settings: Settings;
  lang: Language;
  t: Translations;
}

export const Hero: React.FC<HeroProps> = ({ settings, lang, t }) => {
  const title = getLocalized(settings, 'title', lang);
  const headline = getLocalized(settings, 'headline', lang);
  const availability = getLocalized(settings, 'availability', lang);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 4.5rem)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingBlock: '4rem 0',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-ink)'
      }}
    >
      {/* Dynamic Interactive Hero Data-Bar Lattice Canvas */}
      <HeroCanvas />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div className="hero-hero-grid">
          {/* Left Text Block */}
          <div className="hero-text-block">
            {/* Pulsing Availability Status Pill */}
            <div style={{ display: 'inline-flex' }}>
              <span className="status-pill">
                <span className="pulse-dot" aria-hidden="true" />
                {availability || t.hero.available}
              </span>
            </div>

            {/* Giant Name */}
            <h1 className="hero-giant-title">
              Amine Bouramtane
            </h1>

            {/* Job Title Accent */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  height: '3px',
                  width: '36px',
                  backgroundColor: 'var(--color-saffron)',
                  borderRadius: '2px'
                }}
              />
              <p
                style={{
                  fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  color: 'var(--color-saffron)',
                  letterSpacing: '-0.01em',
                  margin: 0
                }}
              >
                {title || 'Junior Data Analyst & AI Engineer'}
              </p>
            </div>

            {/* Headline */}
            <p className="hero-description">
              {headline}
            </p>

            {/* Action CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '0.75rem' }}>
              <a href="#work" className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
                {t.hero.seeProjects}
                <ArrowDownRight size={18} />
              </a>

              <a
                href={settings.cv_url || '/cv.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}
              >
                <FileText size={18} className="text-saffron" />
                {t.hero.downloadCv}
              </a>
            </div>
          </div>

          {/* Right Prominent Portrait Photo Column */}
          <div className="hero-portrait-column">
            {/* Back Glow Effect Circle */}
            <div className="portrait-glow-backdrop" />

            <div className="portrait-image-wrapper">
              <img
                src={settings.photo || '/pf.png'}
                alt="Amine Bouramtane"
                width={1374}
                height={1145}
                className="portrait-main-img"
                loading="eager"
              />
              {/* Bottom Blend Gradient */}
              <div className="portrait-bottom-fade" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3.5rem;
          align-items: center;
          width: 100%;
        }

        .hero-text-block {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 680px;
          z-index: 3;
        }

        .hero-giant-title {
          font-size: clamp(2.8rem, 6.5vw, 5.5rem);
          font-weight: 900;
          line-height: 0.98;
          letter-spacing: -0.04em;
          color: var(--color-bone);
          margin: 0;
        }

        .hero-description {
          font-size: clamp(1.05rem, 1.6vw, 1.3rem);
          color: var(--color-slate);
          line-height: 1.6;
          max-width: 600px;
          margin: 0;
        }

        .hero-portrait-column {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          width: 100%;
          z-index: 2;
        }

        .portrait-glow-backdrop {
          position: absolute;
          width: 80%;
          height: 80%;
          top: 10%;
          left: 10%;
          background: radial-gradient(circle, rgba(47, 69, 255, 0.25) 0%, rgba(255, 178, 30, 0.12) 50%, transparent 75%);
          filter: blur(40px);
          pointer-events: none;
          z-index: 1;
        }

        .portrait-image-wrapper {
          position: relative;
          width: 100%;
          max-width: 580px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          z-index: 2;
        }

        .portrait-main-img {
          width: 100%;
          height: auto;
          max-height: 580px;
          object-fit: contain;
          object-position: bottom center;
          display: block;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6));
        }

        .portrait-bottom-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, var(--bg-ink) 0%, rgba(7, 8, 12, 0.3) 18%, transparent 45%);
          pointer-events: none;
        }

        @media (min-width: 992px) {
          .hero-hero-grid {
            grid-template-columns: 1.15fr 1fr !important;
            gap: 4rem !important;
            align-items: end !important;
          }

          .hero-portrait-column {
            justify-content: flex-end !important;
          }

          .portrait-image-wrapper {
            max-width: 620px !important;
          }

          .portrait-main-img {
            max-height: 620px !important;
          }
        }
      `}</style>
    </section>
  );
};
