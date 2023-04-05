/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "tr-cyan": "#06b5d492",
                "tr-blue": "#3b83f673",
            },
        },
    },
    plugins: [],
};
