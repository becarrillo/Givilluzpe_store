const autoprefixer = require("autoprefixer/lib/autoprefixer");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx, ts, tsx}"
  ],
  theme: {
    extend: {
      screens: {
        "xsm": "320px"
      },
      "colors": {
        "french-rose": "#FF5185",
        "air-super-blue": "#739DBD",
        "wisteria": "#C7ACE3",
        "middle-blue": "#7ECED7",
        "apple-green": "#95BB2A",
        "maximum-green-yellow": "#E2EA47",
        
      },
      fontSize: {
        "smd": "15px"
      }
    }
  },
  plugins: [autoprefixer],
}
