/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          dark: "#1E293B", 
          purple: "#F2F0FF", 
          pink: "#FB2E86",  
          heading: "#1A0B5B",
          dress_bg: "#F6F7FB",
        }
      },
    },
    plugins: [
      require('daisyui'),
    ],
    darkMode: 'class',
  }