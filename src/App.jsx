import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import { useTheme } from './hooks/useTheme';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsLoading(false), 1400);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={theme}>
      <div className="min-h-screen bg-surface-50 text-surface-950 transition-colors duration-300 dark:bg-surface-950 dark:text-surface-50 font-body selection:bg-accent-500/30">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Animated background blobs */}
          <div className="absolute top-0 -left-4 w-96 h-96 bg-accent-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob dark:bg-accent-600/20 dark:opacity-40"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-fuchsia-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob dark:bg-fuchsia-600/20 dark:opacity-40" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-violet-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob dark:bg-violet-600/20 dark:opacity-40" style={{ animationDelay: '4s' }}></div>
          {/* Soft Grid overlay */}
          <div className="absolute inset-0 bg-grid bg-[size:32px_32px] opacity-40 dark:opacity-20" />
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <Loader key="loader" />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Navbar theme={theme} onToggleTheme={toggleTheme} />
              <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
              </main>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
