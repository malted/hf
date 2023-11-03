/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				transparent: "transparent",
				black: "#222",
				"dark-green": "#194b30",
				"cta-green": "#4de291",
				"text-green": "#2ab469",
				muted: "#F1F1F1",
				"muted-medium": "E5E5E5",
				"muted-darker": "#767676"
			},
			fontFamily: {
				micr: ["MICR", "monospace"]
			}
		}
	},
	plugins: []
};
