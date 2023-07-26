/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.vue", "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                // ...colors,
                'main-red': '#F12415',
                'main-green': '#77D330',
                'main-yellow': '#FFD500',
                'main-blue-black': '#0B132A',
                'text-color': '#6E6B7B',
                'text-blue': '#145A7C',
                'light-gray': '#6C7E87',
                'bg-black': '#252A30',
            },
            gridTemplateColumns: {
                // Simple n column grid
                '13': 'repeat(13, minmax(0, 1fr))',
                '15': 'repeat(15, minmax(0, 1fr))',
                '16': 'repeat(16, minmax(0, 1fr))',
                '17': 'repeat(17, minmax(0, 1fr))',
                '14': 'repeat(14, minmax(0, 1fr))',
            }
        },
        fontFamily: {
            circular: ['CircularStd', 'sans-serif'],
        },
    },
    plugins: [],
    optimizeDeps: {
        include: [
            "@fawmi/vue-google-maps",
            "fast-deep-equal",
        ],
    },
}