const {
    black, white, gray,
    blue, green, yellow, red,
    orange, pink, violet, indigo, roze
} = require('tailwindcss/colors')

module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: { white, indigo, blue, green, yellow, orange, pink, violet, gray, red, black, roze },
        extend: {}
    },
    variants: {
        extend: {}
    },
    plugins: []
}
