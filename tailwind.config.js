/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Arial', 'sans-serif'],
            },
            colors: {
            },
            backgroundColor: {
                'black': '#000',
                'primary-500': '#1570ef',
                'grey-100': '#d0d3d9'
            },
            borderColor: {
                'gondola-900': '#1c1b29'
            },
            fontSize: {
            },
        },
    },

    plugins: [
    ],
}