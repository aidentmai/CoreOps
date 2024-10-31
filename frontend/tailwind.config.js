import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      height: {
        'custom': '80vh'
      },
      colors: {
        navajowhite: '#FFDEAD',
        'fallback-n': '',
        'fallback-nc': ''
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: []
  }
}

