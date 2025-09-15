/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryDark: "#05004E",
        primary: "#3972C3",
        blue: "#4079ED",
        grayColor: "#737791",
      },
    },
  },
  plugins: [],
};
