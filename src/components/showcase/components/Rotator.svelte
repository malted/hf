<script>
	import { onMount } from "svelte";
	import anime from "animejs";

	export let id;
	export let classes;
	let slotContainer;

	onMount(() => {
		const parentElement = slotContainer.parentElement.parentElement;
		const duration = 2_000;
		const childCount = slotContainer.children[0].children.length;
		const restingElementStyle = "transform: translateY(-100%); opacity: 0; rotateX: 90deg;";
		const elementSelectors = [], animators = [], intervals = [], timeouts = [];
		function registerAnimations() {
			for (let idx = 0; idx < childCount; idx++) {
				const elementSelector = `#${id} #${id}-${idx + 1}`;
				elementSelectors.push(elementSelector);
				timeouts.push(
					setTimeout(() => {
						const self = anime
							.timeline({ duration, easing: "easeInOutExpo" })
							.add({
								targets: elementSelector,
								translateY: ["-100%", 0],
								rotateX: ["90deg", 0],
								scale: [0.8, 1],
								opacity: [0, 1]
							})
							.add({
								targets: elementSelector,
								translateY: [0, "100%"],
								rotateX: [0, "-90deg"],
								scale: [1, 0.8],
								opacity: [1, 0]
							});
						animators.push(self);
						intervals.push(setInterval(() => self.restart(), childCount * duration));
					}, idx * duration)
				);
				// It took me many moons to get this system down
			}
		}

		function registerOrUnregisterAnimations(visible) {
			if (visible) {
				registerAnimations();
			} else {
				animators.forEach((animator) => animator.pause());
				intervals.forEach((interval) => clearInterval(interval));
				timeouts.forEach((timeout) => clearTimeout(timeout));
				elementSelectors.forEach((selector) => document.querySelector(selector).style = restingElementStyle);
				animators.length = intervals.length = timeouts.length = elementSelectors.length = 0;
			}
		}

		new IntersectionObserver(
			(entries) => registerOrUnregisterAnimations(entries[0].isIntersecting),
			{
				root: document.body,
				rootMargin: "0px",
				threshold: 1.0
			}
		).observe(parentElement);
		document.addEventListener("visibilitychange", () =>
			registerOrUnregisterAnimations(document.visibilityState == "visible")
		);
	});
</script>

		
<div
	{id}
	class={`relative w-full text-left ${classes}`}
	style="perspective: 200px; transform-origin: center;"
	bind:this={slotContainer}
>
	<slot />
</div>
