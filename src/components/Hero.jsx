import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { profile } from '../data/portfolioData';

function Hero() {
  return (
    <section id="home" className="relative mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-6xl items-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-surface-200/50 bg-white/40 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-surface-700 shadow-glass backdrop-blur-md dark:border-surface-700/50 dark:bg-surface-900/40 dark:text-surface-300">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500"></span>
            </span>
            Available for opportunities
          </div>

          <h1 className="font-heading text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I'm{' '}
            <span className="animate-text-gradient bg-gradient-to-r from-accent-400 via-fuchsia-400 to-accent-400 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>
          <p className="mt-6 text-xl font-medium text-surface-600 dark:text-surface-300 sm:text-2xl">
            {profile.title}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-surface-500 dark:text-surface-400 sm:text-lg">
            {profile.summary}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-surface-900 px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-surface-800 hover:shadow-xl hover:shadow-surface-900/20 dark:bg-white dark:text-surface-950 dark:hover:bg-surface-100 dark:hover:shadow-white/10"
            >
              View Projects
              <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-surface-200 bg-transparent px-8 py-4 text-sm font-semibold text-surface-700 transition-all hover:-translate-y-1 hover:border-surface-300 hover:bg-surface-50 dark:border-surface-700 dark:text-surface-200 dark:hover:border-surface-600 dark:hover:bg-surface-900"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-sm"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="absolute -inset-1 animate-pulseSoft rounded-[40px] bg-gradient-to-br from-accent-400/30 via-fuchsia-400/20 to-violet-300/30 blur-2xl dark:from-accent-600/30 dark:via-fuchsia-600/20 dark:to-violet-500/20" />
          <div className="relative rounded-[36px] border border-surface-200/50 bg-white/60 p-8 shadow-glass backdrop-blur-2xl dark:border-surface-700/50 dark:bg-surface-900/60">
            <div className="mb-6 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-surface-500 dark:text-surface-400">
              <span className="flex items-center gap-2">
                <Sparkles size={14} className="text-accent-500" />
                Focus Areas
              </span>
              <span className="h-2 w-2 animate-shimmer rounded-full bg-accent-400" />
            </div>

            <ul className="space-y-4 text-sm font-medium text-surface-700 dark:text-surface-200">
              <li className="flex items-center gap-3 rounded-2xl border border-surface-200/50 bg-white/50 px-5 py-4 transition-colors hover:bg-white/80 dark:border-surface-700/50 dark:bg-surface-900/50 dark:hover:bg-surface-800/80">
                <div className="h-2 w-2 rounded-full bg-accent-400" />
                Intelligent Data Systems
              </li>
              <li className="flex items-center gap-3 rounded-2xl border border-surface-200/50 bg-white/50 px-5 py-4 transition-colors hover:bg-white/80 dark:border-surface-700/50 dark:bg-surface-900/50 dark:hover:bg-surface-800/80">
                <div className="h-2 w-2 rounded-full bg-fuchsia-400" />
                Machine Learning Workflows
              </li>
              <li className="flex items-center gap-3 rounded-2xl border border-surface-200/50 bg-white/50 px-5 py-4 transition-colors hover:bg-white/80 dark:border-surface-700/50 dark:bg-surface-900/50 dark:hover:bg-surface-800/80">
                <div className="h-2 w-2 rounded-full bg-violet-400" />
                Computer Vision Solutions
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
