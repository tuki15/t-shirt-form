module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {        
        'front': "url('~@/assets/front.jpg')",
        'back': "url('~@/assets/back.jpg')"
      }
    },
  },
  variants: {
    extend: {
    },
    backgroundColor: ({ after }) => after(['disabled'])
  },
  plugins: [],
}