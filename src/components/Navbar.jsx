import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, profile } from '../data/portfolioData';

function Navbar({ theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full border border-surface-200/50 bg-white/50 shadow-glass backdrop-blur-xl dark:border-surface-800/50 dark:bg-surface-950/50 transition-all duration-300">
      <nav className="flex w-full items-center justify-between px-6 py-3">
        <a href="#home" className="font-heading text-lg font-bold tracking-wider text-surface-900 dark:text-surface-50">
          {profile.name}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-surface-600 transition-colors hover:text-accent-500 dark:text-surface-300 dark:hover:text-accent-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle color mode"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-200/80 bg-white/80 text-surface-600 transition-all hover:border-accent-400 hover:text-accent-500 hover:shadow-glass-light dark:border-surface-700 dark:bg-surface-900/80 dark:text-surface-300"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-200/80 bg-white/80 text-surface-600 md:hidden dark:border-surface-700 dark:bg-surface-900/80 dark:text-surface-300"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-4 rounded-3xl border border-surface-200/50 bg-white/90 p-4 shadow-glass backdrop-blur-xl md:hidden dark:border-surface-800/50 dark:bg-surface-950/90"
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-surface-600 transition-colors hover:bg-surface-100/50 hover:text-accent-500 dark:text-surface-300 dark:hover:bg-surface-800/50"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
