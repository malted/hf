/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				muted: "#F1F1F1",
				"muted-darker": "#767676"
			},
			fontFamily: {
				micr: ["MICR", "monospace"]
			}
		}
	},
	plugins: []
};
