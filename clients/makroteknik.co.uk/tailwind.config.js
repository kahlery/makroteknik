/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0f172a",
                secondary: "#0891b2",
                fon: "#f2f2f2",

                1: "#003f5c",
                2: "#58508d",
                3: "#bc5090",
                4: "#ff6361",
                5: "#ffa600",
            },
            boxShadow: {
                top: "0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1);",
            },
        },
    },
    plugins: [],
}
