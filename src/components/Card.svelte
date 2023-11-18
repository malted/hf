<script>
	export let id, classes = "", style;

	//#region Padding class
	const defaultPaddingClass = "p-5";
	const defaultGapClass = "gap-4";
	let c = classes.split(" ");
	if (!c.find((c) => c.startsWith("p-"))) c.push(defaultPaddingClass);
	if (!c.find((c) => c.startsWith("gap-"))) c.push(defaultGapClass);
	classes = c.join(" ");
	//#endregion
</script>

<div
	{id}
	class={`
relative
flex col gap-4 items-start justify-between
h-fit w-full 
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