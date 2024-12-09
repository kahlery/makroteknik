/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0f172a",
                // secondary: "#333",
                secondary: "#0891b2",
                // secondary: "#FF5A5F",
                fon: "#e8e8e8",
            },
            boxShadow: {
                top: "0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1);",
            },
        },
    },
    plugins: [],
}
