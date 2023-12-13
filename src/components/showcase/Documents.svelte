<script>
	import { onMount } from "svelte";
	import anime from "animejs";
	import Card from "../Card.svelte";
	import Marquee from "svelte-marquee";

	const speed = "slow";

	onMount(() => {
		anime({
			targets: "#documents .placeholder-line",
			width: (_, i) => [0, i === 2 ? "40%" : "100%"],
			duration: 800,
			easing: "easeInOutExpo",
			delay: (el, i) => (150 * i) + 800
		});
	});
</script>

<Card id="documents" classes="justify-start grow-0">
	<p class="text-xl font-medium">Legal documents</p>

	<div class="flex col gap-2 w-full">
		<div class="w-0 h-1 rounded bg-muted placeholder-line"></div>
		<div class="w-0 h-1 rounded bg-muted placeholder-line"></div>
		<div class="w-0 h-1 rounded bg-muted placeholder-line"></div>
	</div>

	<div class="marquees w-32">
		<Marquee
			{speed}
			content="Fiscal sponsorship confirmation | Reciepts"
		/>
		<Marquee
			{speed}
			reverse={true}
			content="Form W-9 | IRS 501(c)(3) Documentation Letter"
		/>
		<Marquee
			speed="medium"
			content="Certificate of status | Event liability forms"
		/>
	</div>
</Card>

<style>
	:global(#documents .marquees span) {
		font-size: 0.75rem; line-height: 1rem;
	}
</style>