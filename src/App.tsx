import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Language, translations } from './i18n/translations';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  });

  // Language state
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang') as Language;
    if (saved && ['en', 'fr', 'ar'].includes(saved)) return saved;
    return 'en';
  });

  // Sync Theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync Language & RTL attributes
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('lang', lang);
  }, [lang]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
  };

  const t = translations[lang];

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              lang={lang}
              onLanguageChange={handleLanguageChange}
              theme={theme}
              onThemeToggle={handleThemeToggle}
              t={t}
            />
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <ProjectDetailPage
              lang={lang}
              onLanguageChange={handleLanguageChange}
              theme={theme}
              onThemeToggle={handleThemeToggle}
              t={t}
            />
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="*"
          element={
            <NotFoundPage
              lang={lang}
              onLanguageChange={handleLanguageChange}
              theme={theme}
              onThemeToggle={handleThemeToggle}
              t={t}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
