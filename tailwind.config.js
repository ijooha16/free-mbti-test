/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8b25ff",
        sub01: "#5a1ca0",
        subgray: "#91959b",
        lightgray: "#f0f1f6",
      },
    },
  },
  plugins: [],
};
