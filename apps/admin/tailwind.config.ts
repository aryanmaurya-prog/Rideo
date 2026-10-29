import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rideo: {
          orange: '#FF6B00',
          'orange-dark': '#E55A00',
          navy: '#0F172A',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          canvas: '#FAFAFA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
