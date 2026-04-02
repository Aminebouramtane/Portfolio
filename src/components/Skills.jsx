import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { skills } from '../data/portfolioData';

function Skills() {
  return (
    <section id="skills" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Capabilities"
        title="Technical Skills"
        subtitle="A balanced toolkit across software engineering, AI modeling, and production-grade data systems."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.article
              key={skill.category}
              className="group relative overflow-hidden rounded-[2rem] border border-surface-200/50 bg-white/50 p-8 shadow-glass backdrop-blur-xl transition-all hover:bg-white/80 dark:border-surface-700/50 dark:bg-surface-900/50 dark:hover:bg-surface-800/80"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-100 text-accent-500 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent-500 group-hover:text-white dark:bg-surface-800 dark:group-hover:bg-accent-500">
                    <Icon size={24} />
                  </span>
                  <h3 className="font-heading text-xl font-bold tracking-tight text-surface-900 dark:text-surface-50">{skill.category}</h3>
                </div>
                <span className="rounded-full bg-surface-100 px-3 py-1 text-xs font-bold text-surface-500 dark:bg-surface-800 dark:text-surface-400">{skill.level}%</span>
              </div>

              <div className="mb-6 h-2 overflow-hidden rounded-full bg-surface-200/60 dark:bg-surface-800/60">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent-500 via-fuchsia-400 to-accent-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span key={item} className="rounded-lg bg-surface-100/50 px-3 py-1.5 text-sm font-medium text-surface-600 transition-colors hover:bg-surface-200 hover:text-surface-950 dark:bg-surface-800/50 dark:text-surface-300 dark:hover:bg-surface-700 dark:hover:text-white">
                    {item}
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

export default Skills;
