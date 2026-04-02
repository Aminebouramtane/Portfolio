import { motion } from 'framer-motion';

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55 }}
      className="mx-auto mb-10 max-w-2xl text-center"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent-500 dark:text-accent-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold font-heading sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-slate-600 dark:text-slate-300">{subtitle}</p> : null}
    </motion.div>
  );
}

export default SectionTitle;
