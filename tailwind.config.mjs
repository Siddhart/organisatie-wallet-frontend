/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'kvk-blue': '#0056b3',
        'kvk-blue-dark': '#004494',
        'kvk-gray': '#666666',
        'kvk-light-gray': '#f5f5f5',
      },
    },
  },
  plugins: [],
};
