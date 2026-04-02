import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { socialLinks } from '../data/portfolioData';

const CONTACT_EMAIL = 'amine.bouramtane@example.com';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Contact"
        title="Let&apos;s Build Something Valuable"
        subtitle="If you have a role, project, or collaboration idea in AI and data systems, I would love to hear about it."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200/70 bg-white/75 p-6 shadow-glass backdrop-blur-md sm:p-8 dark:border-slate-800 dark:bg-slate-900/60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid gap-4">
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-300/80 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-accent-500 dark:border-slate-700 dark:bg-slate-900/70"
                placeholder="Your name"
              />
            </label>

            <label className="text-sm text-slate-600 dark:text-slate-300">
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-300/80 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-accent-500 dark:border-slate-700 dark:bg-slate-900/70"
                placeholder="your.email@example.com"
              />
            </label>

            <label className="text-sm text-slate-600 dark:text-slate-300">
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-slate-300/80 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-accent-500 dark:border-slate-700 dark:bg-slate-900/70"
                placeholder="Tell me about your project or opportunity."
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            Send Message
            <Send size={16} />
          </button>
        </motion.form>

        <motion.aside
          className="rounded-2xl border border-slate-200/70 bg-white/75 p-6 shadow-glass backdrop-blur-md sm:p-8 dark:border-slate-800 dark:bg-slate-900/60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <h3 className="font-heading text-2xl font-semibold">Contact Details</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            I am open to software engineering roles, AI-focused collaborations, and technical consulting opportunities.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-300/80 px-4 py-2 text-sm text-slate-700 transition hover:border-accent-400 hover:text-accent-500 dark:border-slate-700 dark:text-slate-200"
          >
            <Mail size={16} />
            {CONTACT_EMAIL}
          </a>

          <div className="mt-8 flex flex-col gap-3 text-sm">
            {socialLinks.map((link) => {
              const Icon = link.label === 'GitHub' ? Github : Linkedin;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-slate-300/70 bg-white/70 px-4 py-3 text-slate-600 transition hover:-translate-y-1 hover:border-accent-400 hover:text-accent-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon size={16} />
                    {link.label}
                  </span>
                  <span>{link.handle}</span>
                </a>
              );
            })}
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

export default Contact;
