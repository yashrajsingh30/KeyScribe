/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#2E3A59', light: '#3F4A78', dark: '#1F253C' },
        secondary: '#FF5A5F',
        neutral: {
          50: '#F9FAFB', 100: '#F2F4F7', 200: '#E5E7EB',
          300: '#D2D6DB', 400: '#9FA6B2', 500: '#6B7280',
          600: '#4B5563', 700: '#374151', 800: '#1F2937', 900: '#111827',
        },
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      fontSize: {
        sm: ['0.875rem','1.3rem'], base: ['1rem','1.5rem'],
        lg: ['1.125rem','1.6rem'], xl: ['1.5rem','1.75rem'],
      },
      borderRadius: { xl: '1rem', '2xl': '1.5rem' },
      boxShadow: { lg: '0 10px 25px -5px rgba(0,0,0,0.1)' },
    },
  },
  plugins: [],
};
