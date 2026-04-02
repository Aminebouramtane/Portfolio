import { profile } from '../data/portfolioData';

function Footer() {
  return (
    <footer className="border-t border-slate-200/70 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
      <p>
        {new Date().getFullYear()} {profile.name}. Crafted with React, TailwindCSS, and Framer Motion.
      </p>
    </footer>
  );
}

export default Footer;
