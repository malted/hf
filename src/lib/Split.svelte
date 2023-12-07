<script>
	export let word, classes = "";
</script>

{#each word.split("") as ch}
	<span class={`letter ${classes}`}>{ch.replace(" ", "\u00A0")}</span>
{/each}

<style>
	.letter {
		opacity: 0;
		display: inline-block;
	}
</style>
