import React, { useEffect, useState } from 'react';
import { api, SiteData } from '../services/api';
import { Language, Translations, translations } from '../i18n/translations';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { SelectedWork } from '../components/SelectedWork';
import { NumbersDashboard } from '../components/NumbersDashboard';
import { About } from '../components/About';
import { Toolkit } from '../components/Toolkit';
import { PathTimeline } from '../components/PathTimeline';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

interface HomePageProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  t: Translations;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onLanguageChange,
  theme,
  onThemeToggle,
  t
}) => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.getSiteData()
      .then((data) => {
        setSiteData(data);
        setLoading(false);
        // Track anonymous page ping
        api.trackPage('/');
      })
      .catch((err) => {
        console.error('Failed to load API site data:', err);
        setLoading(false);
      });
  }, []);

  const handleSelectCategoryFromDashboard = (category: string) => {
    setSelectedCategoryFilter(category);
    const workElem = document.getElementById('work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading || !siteData) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-ink)' }}>
        <Header lang={lang} onLanguageChange={onLanguageChange} theme={theme} onThemeToggle={onThemeToggle} t={t} />
        {/* Loading Skeletons */}
        <div className="container" style={{ paddingBlock: '6rem' }}>
          <div style={{ width: '40%', height: '3rem', backgroundColor: 'rgba(236,235,227,0.06)', borderRadius: 'var(--radius-md)', marginBottom: '2rem', animation: 'pulse 1.5s infinite' }} />
          <div style={{ width: '80%', height: '5rem', backgroundColor: 'rgba(236,235,227,0.06)', borderRadius: 'var(--radius-md)', marginBottom: '3rem', animation: 'pulse 1.5s infinite' }} />
          <div style={{ width: '100%', height: '400px', backgroundColor: 'rgba(236,235,227,0.04)', borderRadius: 'var(--radius-lg)', animation: 'pulse 1.5s infinite' }} />
        </div>
        <style>{`@keyframes pulse { 50% { opacity: 0.5; } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-ink)', color: 'var(--color-bone)' }}>
      <Header
        lang={lang}
        onLanguageChange={onLanguageChange}
        theme={theme}
        onThemeToggle={onThemeToggle}
        t={t}
      />

      <main id="main-content">
        <Hero settings={siteData.settings} lang={lang} t={t} />

        <SelectedWork
          projects={siteData.projects}
          lang={lang}
          t={t}
          selectedCategoryFilter={selectedCategoryFilter}
          onClearCategoryFilter={() => setSelectedCategoryFilter(null)}
        />

        <NumbersDashboard
          projects={siteData.projects}
          skills={siteData.skills}
          t={t}
          onSelectCategory={handleSelectCategoryFromDashboard}
        />

        <About settings={siteData.settings} lang={lang} t={t} />

        <Toolkit skills={siteData.skills} t={t} />

        <PathTimeline timeline={siteData.timeline} lang={lang} t={t} />

        <ContactSection settings={siteData.settings} t={t} />
      </main>

      <Footer t={t} />
    </div>
  );
};
