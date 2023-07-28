/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
   ],
  theme: {
    extend: {
      spacing: {
        '128': '61rem',
      },
      scale: {
        '15': '0.15',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

