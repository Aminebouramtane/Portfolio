# Amine Bouramtane Portfolio (React + TailwindCSS)

A modern, responsive personal portfolio website for an AI Software Engineer profile.

## Tech Stack

- React (functional components + hooks)
- TailwindCSS
- Framer Motion (animations)
- Lucide React (icons)
- Vite

## Features

- Clean and modern UI (glassmorphism + minimal aesthetics)
- Dark/light mode toggle with localStorage persistence
- Responsive navbar with smooth scrolling
- Hero section with animated visuals and CTA
- About, Skills, Projects, Experience timeline
- Contact form using mailto (frontend-only)
- Loading animation and scroll reveal effects

## Project Structure

```text
portfolio/
  index.html
  package.json
  postcss.config.js
  tailwind.config.js
  vite.config.js
  src/
    App.jsx
    main.jsx
    data/
      portfolioData.js
    hooks/
      useTheme.js
    components/
      Navbar.jsx
      Hero.jsx
      About.jsx
      Skills.jsx
      Projects.jsx
      Experience.jsx
      Contact.jsx
      Footer.jsx
      Loader.jsx
      SectionTitle.jsx
    styles/
      index.css
```

## Run Locally

1. Install Node.js (LTS) if not installed.
2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Preview production build:

```bash
npm run preview
```

## Update Contact Email

Open `src/components/Contact.jsx` and change:

- `CONTACT_EMAIL` to your real email address.

## Optional: Switch to EmailJS

Current form behavior uses `mailto:` for frontend-only simplicity.

To use EmailJS instead:

1. Create an EmailJS account at https://www.emailjs.com.
2. Create:
   - Email Service
   - Email Template
   - Public Key
3. Install SDK:

```bash
npm install @emailjs/browser
```

4. Add environment variables in `.env`:

```bash
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

5. Replace `handleSubmit` in `src/components/Contact.jsx` using:

```js
import emailjs from '@emailjs/browser';

await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  {
    from_name: form.name,
    from_email: form.email,
    message: form.message
  },
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);
```

6. In your EmailJS template, map variables:
   - `from_name`
   - `from_email`
   - `message`

## Notes

- Social links are placeholders in `src/data/portfolioData.js`.
- Update project descriptions, timeline entries, and links to match your real profile.
