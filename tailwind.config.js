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
          "primary": "#373F51",
          "light": "#D9D9D9"
        },
        "green": {
          "primary": "#1cc987"
        }
      }
    },
  },
  plugins: [],
  safelist: [
    "bg-white",
    "bg-light-blue",
    "text-light-blue",
    "bg-input-background",
    "text-input-text",
    "border-input-border",
    "bg-gray-primary",
    "text-gray-primary",
    "bg-gray-light",
  ]
};
