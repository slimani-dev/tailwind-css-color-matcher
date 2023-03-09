const {
    black, white, gray,
    blue, green, yellow, red,
    orange, pink, violet, indigo, roze
} = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        colors: { white, indigo, blue, green, yellow, orange, pink, violet, gray, red, black, roze },
        extend: {}
    },
    variants: {
        extend: {}
    },
    plugins: []
}
