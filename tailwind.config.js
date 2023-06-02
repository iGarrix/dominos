/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		fontFamily: {
			asans: "'Albert Sans', sans-serif",
			quicksand: "'Quicksand', sans-serif",
			sync: "'Syncopate', sans-serif",
			rubik: "'Rubik', sans-serif",
			sans: "'Open Sans', sans-serif",
			rubikmono: "'Rubik Mono One', sans-serif",
		},
		extend: {
			colors: {
				dark: {
					DEFAULT: '#0C0B11',
				},
				light: {
					DEFAULT: '#EAEAEA',
				},
				grapefruit: {
					DEFAULT: '#ED5565',
					200: '#DA4453',
				},
				bittersweet: {
					DEFAULT: '#FC6E51',
					200: '#E9573F',
				},
				sun: {
					DEFAULT: '#FFCE54',
					200: '#F6BB42',
				},
				grass: {
					DEFAULT: '#A0D468',
					200: '#8CC152',
				},
				mint: {
					DEFAULT: '#48CFAD',
					200: '#37BC9B',
				},
				aqua: {
					DEFAULT: '#4FC1E9',
					200: '#3BAFDA',
				},
				jeans: {
					DEFAULT: '#5D9CEC',
					200: '#4A89DC',
				},
				lavander: {
					DEFAULT: '#AC92EC',
					200: '#967ADC',
				},
				pinkrose: {
					DEFAULT: '#EC87C0',
					200: '#D770AD',
				},
			},
		},
	},
	plugins: [],
};
