<script>
	export let id, classes = "", style;

	const defaults = [["p", "5"], ["gap", "4"], ["h", "fit"]];

	let c = classes.split(" ");
	defaults.forEach((d) => {
		if (!c.find((c) => c.startsWith(`${d[0]}-`))) c.push(d.join("-"));
	});
	classes = c.join(" ");
</script>

<div
	{id}
	class={`
relative
flex col items-start justify-between
w-full 
text-muted-darker bg-white
rounded-lg 
border border-muted-medium
overflow-hidden
${classes}
`}
	{style}
>
	<slot />
</div>