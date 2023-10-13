/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		colors: {
			text: '#010813',
			background: '#e2ecff',
			primary: '#0A3380',
			secondary: '#AEC8F9',
			accent: '#0F51CC',
			skeleton: '#d1d5db',
			darkMode: {
				text: '#ecf3fe',
				background: '#000b1f',
				primary: '#7fa8f5',
				secondary: '#062051	',
				accent: '#3375f0',
				skeleton: '#374151',
			},
		},
	},
	plugins: [],
};
