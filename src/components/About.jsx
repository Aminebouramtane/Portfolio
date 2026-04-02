import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="About Me"
        title="Engineering Intelligence Into Real Products"
        subtitle="I bridge data, algorithms, and software architecture to build reliable systems that produce measurable impact."
      />

      <motion.div
        className="mx-auto max-w-4xl rounded-3xl border border-slate-200/70 bg-white/70 p-8 shadow-glass backdrop-blur-md sm:p-10 dark:border-slate-800 dark:bg-slate-900/60"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
      >
        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
          I am a Software Engineer focused on building AI-powered systems that are both technically robust and practical for real-world use. From model experimentation to deployment-ready architecture, I enjoy turning complex data challenges into clean, scalable products. My work spans machine learning, computer vision, and modern web technologies, with a strong emphasis on performance, maintainability, and user impact.
        </p>
      </motion.div>
    </section>
  );
}

export default About;
