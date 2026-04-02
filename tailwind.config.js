/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          900: '#18181b',
          950: '#09090b',
        },
        accent: {
          400: '#c084fc', // fuchsia-400
          500: '#a855f7', // fuchsia-500
          600: '#8b5cf6', // violet-500
          700: '#7c3aed', // violet-600
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      boxShadow: {
        glass: '0 8px 32px rgba(9, 9, 11, 0.25)',
        'glass-light': '0 8px 32px rgba(0, 0, 0, 0.08)'
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(161, 161, 170, 0.15) 1px, transparent 0)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        pulseSoft: 'pulseSoft 4s ease-in-out infinite',
        blob: 'blob 7s infinite',
        'text-gradient': 'text-gradient 3s linear infinite',
        scroll: 'scroll 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' }
        },
        shimmer: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' }
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' }
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' }
        },
        'text-gradient': {
          to: {
            backgroundPosition: '200% center'
          }
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }
    }
  },
  plugins: []
};
