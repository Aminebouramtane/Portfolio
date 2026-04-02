import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { experience } from '../data/portfolioData';

function Experience() {
  return (
    <section id="experience" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Journey"
        title="Experience"
        subtitle="A timeline of technical focus areas and the evolution of my engineering impact."
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-[14px] top-2 h-[calc(100%-1rem)] w-[2px] bg-slate-300 dark:bg-slate-700 sm:left-1/2 sm:-translate-x-1/2" />

        <div className="space-y-8">
          {experience.map((item, index) => {
            const Icon = item.icon;
            const rightAligned = index % 2 !== 0;

            return (
              <motion.div
                key={`${item.role}-${item.period}`}
                className={`relative sm:flex ${rightAligned ? 'sm:justify-end' : 'sm:justify-start'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <span className="absolute left-0 top-7 z-10 rounded-full border border-slate-300 bg-white p-1 text-accent-500 dark:border-slate-700 dark:bg-slate-900 sm:left-1/2 sm:-translate-x-1/2">
                  <Icon size={14} />
                </span>

                <article className="ml-10 w-[calc(100%-2.5rem)] rounded-2xl border border-slate-200/70 bg-white/75 p-5 shadow-glass backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 sm:ml-0 sm:w-[calc(50%-2rem)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-500 dark:text-accent-400">
                    {item.period}
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-semibold">{item.role}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.details}</p>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Experience;
