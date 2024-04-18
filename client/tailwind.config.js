/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      mono: [
        'ui-monospace, sans-serif',
        {
          fontFeatureSettings: 'ui-monospace',
          fontVariationSettings: 'ui-monospace'
        },
      ],
    },
    extend: {

    },
  },
  plugins: [],
}