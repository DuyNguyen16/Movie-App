/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        myDark: "#09090b",
      },
      boxShadow: {
        myShadow: "0 0.2px 5px 0.2px #333333",

      },
    },
  },
  plugins: [],
}