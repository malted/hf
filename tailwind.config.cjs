/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				transparent: "transparent",
				black: "#222",
				"dark-green": "#8f1b2b",
				"cta-green": "#ec3750",
				"text-green": "#c8132c",
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
