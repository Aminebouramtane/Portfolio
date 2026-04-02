import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { projects } from '../data/portfolioData';

function Projects() {
  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Selected Work"
        title="Featured Projects"
        subtitle="A sample of AI and data-focused products designed for measurable business and operational outcomes."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.article
              key={project.title}
              className="group relative overflow-hidden rounded-[2rem] border border-surface-200/60 bg-white/60 p-8 shadow-glass backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-500/20 dark:border-surface-700/60 dark:bg-surface-900/60"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute inset-x-0 -top-px h-[2px] w-full bg-gradient-to-r from-transparent via-accent-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:via-fuchsia-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent-400/5 via-transparent to-fuchsia-400/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10 mb-6 flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-100 text-accent-500 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent-500 group-hover:text-white dark:bg-surface-800 dark:group-hover:bg-accent-500">
                  <Icon size={24} />
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-100 text-surface-400 opacity-0 transition-all duration-500 group-hover:opacity-100 dark:bg-surface-800 dark:text-surface-500">
                  <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-500" />
                </span>
              </div>

              <h3 className="relative z-10 font-heading text-2xl font-bold tracking-tight text-surface-900 transition-colors group-hover:text-accent-600 dark:text-surface-50 dark:group-hover:text-accent-400">{project.title}</h3>
              <p className="relative z-10 mt-4 line-clamp-3 text-sm leading-relaxed text-surface-600 dark:text-surface-300">{project.description}</p>

              <div className="relative z-10 mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-100/80 px-4 py-1.5 text-xs font-semibold text-surface-700 backdrop-blur-sm transition-colors group-hover:bg-fuchsia-500/10 group-hover:text-fuchsia-600 dark:bg-surface-800/80 dark:text-surface-300 dark:group-hover:bg-fuchsia-400/10 dark:group-hover:text-fuchsia-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

export default Projects;
