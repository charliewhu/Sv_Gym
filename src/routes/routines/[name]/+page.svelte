<script lang="ts">
	import ExerciseDropdown from '$lib/components/ExerciseDropdown.svelte';

	export let data;
</script>

<svelte:head>
	<title>{data.routine.name}</title>
</svelte:head>

<ExerciseDropdown action="" exercises={data.exercises} />
