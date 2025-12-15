/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'selector',
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				text: '#03111c',
				background: '#cbdae7',
				primary: '#0a3a61',
				secondary: '#ffffff',
				accent: '#1887e2',
				darkMode: {
					text: '#e3f1fc',
					background: '#121212',
					primary: '#9ecef5',
					secondary: '#1e1e1e',
					accent: '#1d8ce7',
				},
			},
		},
	},
	plugins: [],
};
