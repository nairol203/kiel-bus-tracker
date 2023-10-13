/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		colors: {
			text: '#010813',
			background: '#e2ecff',
			primary: '#0A3380',
			secondary: '#c9d9f7',
			accent: '#315aa5',
			// skeleton: '#d1d5db',
			skeleton: '#c9d9f7',
			darkMode: {
				text: '#ecf3fe',
				background: '#000b1f',
				primary: '#7fa8f5',
				secondary: '#062051	',
				accent: '#5a83ce',
				// skeleton: '#374151',
				skeleton: '#062051',
			},
		},
	},
	plugins: [],
};
