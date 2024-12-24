/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],

    theme: {
        extend: {
            fontFamily: {
                'nunito': ['Nunito', 'sans-serif'],
            },
            colors: {
                'primary-500': '#1570ef',
                'grey-100': '#f0f1f3',
                'grey-300': '#989fad',
                'grey-500': '#667085',
                'grey-700': '#48505e',
                'grey-900': '#2b2f38',
                'blue-chalk-100': '#f5ebfa',
                'snuff-200': '#e7dbef',
                'wisteria-600': '#a56abd',
                'eminence-800': '#6e3482',
                'bossa-nova-900': '#49225b',
                'punch-600': '#e20c0c'
            },
            backgroundColor: {
                'black': '#000',
                'primary-500': '#1570ef',
                'grey-100': '#d0d3d9'
            },
            borderColor: {
                'gondola-900': '#1c1b29'
            },
            animation: {
                'sidebar-open': 'sidebarOpen 0.1s ease-out',
                'sidebar-close': 'sidebarClose 0.1s ease-out',
            },
            keyframes: {
                sidebarOpen: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                sidebarClose: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
            },
        },
    },

    plugins: [
    ],
}