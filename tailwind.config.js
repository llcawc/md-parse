import tailwindcssTypography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js}'],
  darkMode: 'selector',
  theme: {
    extend: {},
  },
  plugins: [tailwindcssTypography()],
}
