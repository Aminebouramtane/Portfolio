import { motion } from 'framer-motion';

function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-surface-50 dark:bg-surface-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative flex flex-col items-center gap-4">
        <motion.div
          className="h-20 w-20 rounded-2xl border border-slate-300/60 bg-white/40 shadow-glass backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/50"
          animate={{ rotate: [0, 90, 180, 270, 360], borderRadius: ['18%', '24%', '32%', '24%', '18%'] }}
          transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.p
          className="font-heading text-xs tracking-[0.35em] text-slate-500 dark:text-slate-400"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          LOADING
        </motion.p>
      </div>
    </motion.div>
  );
}

export default Loader;
