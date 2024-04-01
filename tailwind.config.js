/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#A9BCD0",
        "input": {
          "background": "#EBEBEB",
          "text": "#949494",
          "border": "#949494",
        },
        "gray": {
          "primary": "#373F51"
        }
      }
    },
  },
  plugins: [],
};
