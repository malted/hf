<script>
	import { onMount } from "svelte";
	import { faker } from "@faker-js/faker";
	import anime from "animejs";
	import ms from "ms";
	import Split from "../../lib/Split.svelte";
	import sorted_raw_mock_transactions from "./components/mock_transactions";
	import { shuffle } from "../../lib/utils.js";
	import Card from "../Card.svelte";

	const rawTransactions = shuffle(sorted_raw_mock_transactions);
	const eventName = shuffle(["Klickitat Teaching Garden"])[0];
	const eventBalance = faker.finance.amount(100, 10_000, 2, "", true);

	const cardholders = Array.from(
		{ length: 5 },
		(_, idx) => idx === 4 ? "https://gravatar.com/avatar/e6b620fa331ca06d2429adce433a4df9" : faker.image.urlLoremFlickr({ category: "people" })
	);

	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	let transactionsContainer;
	const transactionDisplayCount = 10;
	let idx = transactionDisplayCount - 1;

	let transactions = Array.from({ length: transactionDisplayCount }, (_, idx) => {
		return {
			avatar: faker.image.urlLoremFlickr({ category: "people" }),
			ms: faker.date.recent().getTime(),
			amount: rawTransactions[idx].amount,
			memo: rawTransactions[idx].desc
		};
	})
		.filter((t) => !t.memo.includes("withdraw"))
		.sort((a, b) => b.ms - a.ms)
		.slice(0, 5);

	function addTransaction() {
		const t = rawTransactions[++idx % rawTransactions.length];
		transactions.unshift({
			avatar: faker.image.urlLoremFlickr(),
			ms: faker.date.recent().getTime(),
			amount: t.amount,
			memo: t.desc
		});

		setTimeout(() => {
			transactions.pop();
			transactions = transactions;
		}, 5_000);
		
		transactions = transactions;
	}

	function animateTransaction() {
		const duration = 1_600;
		transactionsContainer.dataset.secondlastround = true;
		setTimeout(() => (transactionsContainer.dataset.secondlastround = false), duration / 3);

		const currentFunc = (el, i) => `${(i * el.clientHeight) + (i * 8)}px`;

		anime({
			targets: ".transaction-new",
			scale: [0.3, 1],
			top: [(el, i) => `${(-el.clientHeight)}px`, 0],
			opacity: [0, 1],
			translateZ: 0,
			duration,
		});
		anime({
			targets: ".transaction-existing",
			scale: [(el, i) => i === 5 ? 0 : 1, (el, i) => i === 4 ? 0 : 1],
			top: [
				currentFunc,
				(el, i) => `${((i + 1) * el.clientHeight) + ((i + 1) * 8)}px`,
			],
			duration,
			easing: "easeOutElastic",
			delay: anime.stagger(80)
		});
	}

	onMount(() => {
		const interval = setInterval(() => {
			addTransaction();
			animateTransaction();
		}, 5_000);

		return () => clearInterval(interval);
	});
</script>

<Card id="hcb" classes="p-0 gap-0">
	<div id="garden-container" class="w-full h-44 overflow-hidden">
		<img src="/garden.png" id="hero-img" class="w-full" alt="a child planting a tree in a garden" />
	</div>

	<div class="flex col items-start justify-between gap-6 p-5 h-fit w-full">
		<div class="flex gap-4 items-center">
			<img
				class="rounded-full w-12 h-12"
				src={faker.image.urlLoremFlickr({ category: "nature" })}
				alt=""
			/>
			<p id="event-name" class="text-2xl font-medium">
				<Split word={eventName} />
			</p>
		</div>

		<div class="flex gap-4">
			<div class="flex col w-full items-start gap-1">
				<p class="text-xs">ACCOUNT BALANCE</p>
				<p class="text-xl inline-flex gap-1 items-center">
					<span class="text-sm">$</span>
					<span id="event-balance">
						<Split word={eventBalance} />
					</span>
				</p>
			</div>

			<div class="w-1 bg-muted"></div>

			<div class="flex col items-start gap-1">
				<p class="text-xs whitespace-nowrap">5 CARDHOLDERS</p>
				<div class="relative flex row w-full">
					{#each cardholders as url}
						<img
							src={url}
							alt="team member avatar"
							class="absolute avatar rounded-full w-6 h-6 border"
						/>
					{/each}
				</div>
			</div>
		</div>

		<div class="flex col gap-2 w-full">
			<p class="text-left text-xl">Transactions</p>
			<hr />
			<div class="flex gap-2">
				<div class="flex gap-1 items-center px-2 w-full border border-muted rounded-md">
					<img src="/icons/search.svg" alt="search" class="w-6" />
					<p>Search</p>
				</div>
				<!--
                <div>
                    <img />
                    <p>Filter</p>
                </div>
            -->
			</div>

			<div bind:this={transactionsContainer} class="transactions-container relative h-[14.5rem] flex col gap-1 w-full rounded-md text-left">
				{#each transactions as t, idx}
					<div
						class={`absolute transaction transaction-${idx < 1 ? "new" : "existing"} flex justify-between items-center gap-6 bg-[#F1F1F1] px-2 py-2 w-full h-10 translate-y-[-100000px]`}
					>
						<img
							src={t.avatar}
							class="rounded-full w-5 h-5 object-cover"
							alt="placeholder avatar"
						/>
						<time class="w-16 text-sm">{ms(Date.now() - t.ms)} ago</time>
						<p class="text-sm flex-grow">{t.memo}</p>
						<p class={`text-sm text-right ${t.amount < 0 ? "text-red-500" : "text-text-green"}`}>
							{formatter.format(t.amount)}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</Card>

<style>
	:global(.transaction-old) {
		border: 1px solid red;
	}

	:global(.transaction:first-child) {
		border-radius: 0.375rem 0.375rem 0 0;
	}
	:global(.transaction:last-child),
	:global(.transactions-container[data-secondlastround=false] .transaction:nth-child(5)) {
		border-radius: 0 0 0.375rem 0.375rem;
	}
</style>