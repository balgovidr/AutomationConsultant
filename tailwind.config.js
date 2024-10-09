/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'light': '#e0fbfc',
        'primary': '#3d5a80',
        'secondary': '#98c1d9',
        'accent': '#B87333',
        'dark': '#293241'
      },
      fontFamily: {
        // avenir: ['"Avenir LT Pro"', 'sans-serif'],
        // mada: ['"Mada ExtraLight"', 'sans-serif'],
        primary: ['var(--font-montserrat)'],
        secondary: ['var(--font-bellota)'], // Ensure fonts with spaces have " " surrounding it.
      },
      width: {
        'screen-30': '30vw',
        'screen-50': '50vw',
        'screen-70': '70vw'
      },
      height: {
        'screen-25': '25vh',
        'screen-75': '75vh',
        'screen-90': '90vh',
      }
    },
  },
  plugins: [],
}

