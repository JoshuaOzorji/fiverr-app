/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				lato: ["Lato", "sans-serif"],
				PTsans: ["PT Sans", "sans-serif"],
				PTsanscaption: ["PT Sans Caption", "sans-serif"],
			},
			colors: {
				primary1: "#19A463",
				accent: "#404145",
				accent2: "#646468",
			},
			screens: {
				sm: "320px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
			},
		},
	},
	plugins: [],
};
