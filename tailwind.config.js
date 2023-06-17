/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				background: 'rgb(232, 239, 252)',
				darkMode: {
					background: 'rgb(19, 26, 40)',
				},
			},
		},
	},
	plugins: [],
};
