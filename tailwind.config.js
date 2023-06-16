/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				background: 'rgb(37 99 235 / 0.1)',
			},
		},
	},
	plugins: [],
};
