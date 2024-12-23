/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'selector',
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		colors: {
			text: '#03111c',
			background: '#dfeffc',
			primary: '#0a3a61',
			secondary: '#cce5fa',
			accent: '#1887e2',
			darkMode: {
				text: '#e3f1fc',
				background: '#031321',
				primary: '#9ecef5',
				secondary: '#00294c',
				accent: '#1d8ce7',
			},
		},
	},
	plugins: [],
};
