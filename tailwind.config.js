module.exports = {
	content: ['./views/**/*.ejs'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Segoe UI', 'Arial', 'sans-serif'],
        serif: ['Cambria', 'serif'],
			},
		},
	},
	theme: {
		extend: {
			boxShadow: {
				top: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)'
			},
		},
	},
	plugins: []
}