<script>
	import { onMount } from "svelte";
	import anime from "animejs";
	import Card from "../Card.svelte";

	// import Marquee from "svelte-marquee";
	// const speed = "slow";

	const duration = 4_500;
	const docCount = 4;
	const durationPer = duration / docCount;

	const translateX = [
		{ value: "3rem", duration: durationPer, delay: 150 },	
		{ value: "6rem", duration: durationPer, delay: 100 },
		{ value: "9rem", duration: durationPer, delay: 50 },
		{ value: "12rem", duration: durationPer, delay: 50 }, 
	];
	const opacity = [
		{ value: 1, duration: durationPer },
		{ value: 1, duration: durationPer * (docCount - 2)},
		{ value: 0, duration: 900 }
	];
	const update = (anim) => {
		anim.animatables[0].target.style.zIndex = anim.animations[0].currentValue[0];
	};
	const animeConfig = {
		translateX,
		opacity,
		duration,
		easing: "easeInOutExpo",
		loop: true,
		update,
	};
	
	onMount(() => {
		// anime({
		// 	targets: "#documents .placeholder-line",
		// 	width: (_, i) => [0, i === 2 ? "40%" : "100%"],
		// 	duration: 800,
		// 	easing: "easeInOutExpo",
		// 	delay: (el, i) => (150 * i) + 800,
		// });

		anime({ targets: "#documents .forms img#form-1", ...animeConfig });

		setTimeout(() => {
			anime({ targets: "#documents .forms img#form-2", ...animeConfig });
		}, durationPer);

		setTimeout(() => {
			anime({ targets: "#documents .forms img#form-3", ...animeConfig });
		}, durationPer * 2);

		setTimeout(() => {
			anime({ targets: "#documents .forms img#form-4", ...animeConfig });
		}, durationPer * 3);
	});
</script>

<Card id="documents" classes="justify-start grow-0">
	<p class="text-xl font-medium">Legal documents</p>

	<!-- <div class="flex col gap-2 w-full">
		<div class="w-0 h-1 rounded bg-muted placeholder-line"></div>
		<div class="w-0 h-1 rounded bg-muted placeholder-line"></div>
		<div class="w-0 h-1 rounded bg-muted placeholder-line"></div>
	</div> -->

	<div class="forms w-full h-24 flex-grow-0 overflow-hidden relative">
		<img id="form-1" src="/w9.png" alt="IRS W9 tax form" class="-left-8 absolute opacity-0 rounded-lg border border-muted-medium" style="tranform: translateX(-2rem);" />
		<img id="form-2" src="/cert.png" alt="Nonprofit certificate of status" class="-left-8 absolute opacity-0 rounded-lg border border-muted-medium" />
		<img id="form-3" src="/irsletter.png" alt="IRS letter" class="-left-8 absolute opacity-0 rounded-lg border border-muted-medium" />
		<img id="form-4" src="/hcletter.png" alt="Hack Club donor receipt" class="-left-8 absolute opacity-0 rounded-lg border border-muted-medium" />
	</div>

	<!-- <div class="h-16 overflow-hidden flex-grow-0 relative border border-red-500 w-full h-full"> -->
	

	<!-- <div class="marquees w-32">
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
	</div> -->
</Card>

<!-- <style>
	:global(#documents .marquees span) {
		font-size: 0.75rem; line-height: 1rem;
	}
</style> -->