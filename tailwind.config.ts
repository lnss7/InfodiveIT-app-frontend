import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        brand: {
          DEFAULT: '#0E66FF',
          deep: '#001DFF',
          mid: '#0E5CFF',
          light: '#1469FD',
          tint: '#E4EAFF',
        },
        // Accents
        teal: '#46BEA3',
        indigo: '#5754FF',
        // Neutrals (overrides do gray padrão)
        ink: {
          950: '#141413', // headings, dark sections
          900: '#1A1919', // body text
          500: '#7B7B7B', // texto secundário
          300: '#BFBFBF', // placeholder
          200: '#D8D8D8', // bordas
          50:  '#FAFAFA', // bg seções alternas
        },
      },
      fontFamily: {
        sans: ['var(--font-ibm-plex)', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
      },
      maxWidth: {
        container: '1280px',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config
