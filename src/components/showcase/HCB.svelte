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
	() => "https://gravatar.com/avatar/e6b620fa331ca06d2429adce433a4df9"
);

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});

const transactionDisplayCount = 10;
let idx = transactionDisplayCount - 1;

const transactions = Array.from({ length: transactionDisplayCount }, (_, idx) => {
	return {
		avatar: faker.image.urlLoremFlickr(),
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
		console.log(t);
		transactions.unshift({
			avatar: faker.image.urlLoremFlickr(),
			ms: faker.date.recent().getTime(),
			amount: t.amount,
			memo: t.desc
		});
		transactions.pop();
	}

	function animateTransaction() {
		anime({
			targets: ".transaction",
			translateY: ["-100%", "0%"],
			duration: 1000,
			easing: "easeOutElastic",
			delay: anime.stagger(100) // Delays the animation for each transaction
		});
	}

	onMount(() => {
		setInterval(() => {
			addTransaction();
			animateTransaction();
		}, 2500);
	})
</script>

<Card id="hcb" classes="p-0 gap-0">
	<div id="garden-container" class="w-full h-44 overflow-hidden">
		<img src="/garden.png" id="hero-img" class="w-full" alt="a child planting a tree in a garden" />
	</div>

	<div class="flex col items-start justify-between gap-6 p-5 h-fit w-full">
		<div class="flex gap-4 items-center">
			<img
				class="rounded-full w-12"
				src="https://gravatar.com/avatar/e6b620fa331ca06d2429adce433a4df9"
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
							class="absolute avatar rounded-full w-6 border"
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

			<div class="flex col gap-1 w-full rounded-md overflow-hidden text-left">
				{#each transactions as t}
					<div class="transaction flex justify-between items-center gap-6 bg-[#F1F1F1] px-2 py-2 w-full translate-y-[-100000px]">
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
