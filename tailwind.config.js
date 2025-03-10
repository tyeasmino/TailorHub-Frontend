/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          dark: {
            DEFAULT: "#1E293B",
            light: "#334155",
          },
          purple: {
            DEFAULT: "#F2F0FF",
            dark: "#A29BFE",
          },
          pink: {
            DEFAULT: "#FB2E86",
            dark: "#FF1493",
          },
          heading: "#1A0B5B",
          dress_bg: {
            DEFAULT: "#F6F7FB",
            dark: "#1E1E1E", // Adjust as needed
          },
        },
      },
    },
    darkMode: "class",
    plugins: [
      require('daisyui'),
    ],
    darkMode: 'class',
  }