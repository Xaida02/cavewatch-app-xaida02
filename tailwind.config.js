/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        hboPurple1: "#4B0082",
        hboPurple2: "#6A5ACD",
        hboPurple3: "#8A2BE2",
        hboPurple4: "#9400D3",
        hboPurple5: "#A020F0",
      },
    },

    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
