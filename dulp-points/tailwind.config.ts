import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED',
          50: '#F4EAFF',
          100: '#E5D4FF',
          200: '#C3A7FF',
          300: '#A17AFF',
          400: '#8257F6',
          500: '#7C3AED',
          600: '#6A2ED1',
          700: '#5522A7',
          800: '#40187E',
          900: '#2B0F55'
        },
        neon: '#00FFF0',
        cyber: '#00D4FF'
      },
      backgroundImage: {
        'grid-glow': 'radial-gradient(circle at 1px 1px, rgba(124,58,237,0.3) 1px, transparent 0)' 
      },
      boxShadow: {
        glow: '0 0 20px rgba(124,58,237,0.6)'
      }
    }
  },
  plugins: []
}
export default config