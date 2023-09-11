/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-toolbox-bg':
          'linear-gradient(to right, #071e3d, #061f41, #052144, #032248, #02244c, #022650, #022753, #022957, #042b5c, #082d61, #0c2f66, #10316b)'
      }
    }
  },
  plugins: []
}
