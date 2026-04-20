/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        /* Observatory palette — one muted hue family + one warm accent.
           The `neon` name is kept so existing class usages still resolve;
           values are remapped to soft periwinkle/indigo/moonlight + amber. */
        neon: {
          blue:   '#8b9bc7', // periwinkle — default accent
          violet: '#6b7ba7', // dusk — darker, for depth
          cyan:   '#a8b4d4', // moonlight — lighter tint
          pink:   '#c89b56', // warm amber — the one warm note
        },
        ink:       '#0a0a12', // deep near-black
        parchment: '#f6f2ea', // warm off-white
        ash: {
          100: '#edeae4',
          200: '#d6d1c7',
          300: '#a8a69d',
          400: '#7c7a73',
          500: '#52514c',
          600: '#3a3937',
          700: '#26252a',
          800: '#16161b',
          900: '#0a0a12',
        },
        accent: {
          50:  '#f6efe3',
          100: '#ecddc2',
          200: '#d9bb85',
          300: '#c89b56',
          400: '#a8803f',
          500: '#846230',
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'slide-down': 'slide-down 0.6s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Iowan Old Style', 'Georgia', 'serif'],
      },
      boxShadow: {
        /* Glow tokens remapped to quiet rims. Class names kept for compatibility. */
        'neon':        '0 0 0 1px rgba(139,155,199,0.25), 0 6px 30px -12px rgba(139,155,199,0.35)',
        'neon-violet': '0 0 0 1px rgba(107,123,167,0.25), 0 6px 30px -12px rgba(107,123,167,0.35)',
        'neon-cyan':   '0 0 0 1px rgba(168,180,212,0.25), 0 6px 30px -12px rgba(168,180,212,0.35)',
      }
    },
  },
  plugins: [],
}
