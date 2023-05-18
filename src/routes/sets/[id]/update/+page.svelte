<script lang="ts">
	import SetsForm from '$lib/components/SetsForm.svelte';

	export let data;
</script>

<SetsForm
	action={`?/create`}
	text="Add"
	label="submitSet"
	weight={data.set?.weight}
	reps={data.set?.reps}
	rir={data.set?.rir}
/>
