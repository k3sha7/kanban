module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-3": "#20212C",
        "dark-2": "#2B2C37",
        "dark-1": "#3E3F4E",
        "purple": "#635FC7",
        "gray": "#828fa3"
      }
    },
  },
  variants: {
    fill: ['hover', 'focus'],
    visibility: ["group-hover"],
  },
  plugins: [],
}
