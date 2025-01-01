/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // Includes all files in the pages directory
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Includes all files in the components directory
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Includes all files in the app directory
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))', // Adds radial gradient support
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))', // Adds conic gradient support
      },
    },
  },
  plugins: [], // Add plugins here if needed
};
