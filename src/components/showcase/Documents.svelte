<script>
	import { onMount } from "svelte";
	import anime from "animejs";
	import Card from "../Card.svelte";

	// import Marquee from "svelte-marquee";
	// const speed = "slow";

	const duration = 2_000;

	onMount(() => {
		anime({
			targets: "#documents .placeholder-line",
			width: (_, i) => [0, i === 2 ? "40%" : "100%"],
			duration: 800,
			easing: "easeInOutExpo",
			delay: (el, i) => (150 * i) + 800,
		});

		anime({
			targets: "#documents .forms img#form-1",
			translateX: [
				{ value: "3rem", duration: 1_000 },	
				{ value: "6rem", duration: 1_000 },
				{ value: "9rem", duration: 1_000 },
			],
			  opacity: [
				{ value: 1, duration: 1_000 },
				{ value: 1, duration: 1_000 }, // Maintain opacity for first 2s
				{ value: 0, duration: 1000 }   // Then fade to transparent
			],
			duration,
			easing: "easeInOutExpo",
			loop: true,
			update: (anim) => {
				anim.animatables[0].target.style.zIndex = anim.animations[0].currentValue[0];
			}
		});

		setTimeout(() => {
			const targets = "#documents .forms img#form-2";
			
			anime({
				targets,
				translateX: [
					{ value: "3rem", duration: 1_000 },	
					{ value: "6rem", duration: 1_000 },
					{ value: "9rem", duration: 1_000 },
				],
				opacity: [
					{ value: 1, duration: 1_000 },
					{ value: 1, duration: 1_000 }, // Maintain opacity for first 2s
					{ value: 0, duration: 1000 }   // Then fade to transparent
				],
				duration,
				easing: "easeInOutExpo",
				loop: true,
				update: (anim) => {
					anim.animatables[0].target.style.zIndex = anim.animations[0].currentValue[0];
				}
			});
		}, 1_100);

		setTimeout(() => {
			anime({
				targets: "#documents .forms img#form-3",
				translateX: [
					{ value: "3rem", duration: 1_000 },	
					{ value: "6rem", duration: 1_000 },
					{ value: "9rem", duration: 1_000 },
				],
				opacity: [
					{ value: 1, duration: 1_000 },
					{ value: 1, duration: 1_000 }, // Maintain opacity for first 2s
					{ value: 0, duration: 1000 }   // Then fade to transparent
				],
				duration,
				easing: "easeInOutExpo",
				loop: true,
				update: (anim) => {
					anim.animatables[0].target.style.zIndex = anim.animations[0].currentValue[0];
				}
			});
		}, 2_100);
	});
</script>

<Card id="documents" classes="justify-start grow-0">
	<p class="text-xl font-medium">Legal documents</p>

	<div class="flex col gap-2 w-full">
		<div class="w-0 h-1 rounded bg-muted placeholder-line"></div>
		<div class="w-0 h-1 rounded bg-muted placeholder-line"></div>
		<div class="w-0 h-1 rounded bg-muted placeholder-line"></div>
	</div>

	<div class="forms w-full h-32 flex-grow-0 border border-red-500 overflow-hidden relative">
		<img id="form-1" src="/w9.png" alt="IRS W9 tax form" class="-left-8 absolute opacity-0 rounded-lg border border-muted-medium" style="tranform: translateX(-2rem);" />
		<img id="form-2" src="/cert.png" alt="Nonprofit certificate of status" class="-left-8 absolute opacity-0 rounded-lg border border-muted-medium" />
		<img id="form-3" src="/irsletter.png" alt="IRS letter" class="-left-8 absolute opacity-0 rounded-lg border border-muted-medium" />
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