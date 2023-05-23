<script lang="ts">
	import ListItem from '$lib/components/ListItem.svelte';

	export let data;
</script>

<svelte:head>
	<title>Exercises</title>
</svelte:head>

<div class="text-center mb-6">
	<a href="/exercises/create" aria-label="createExercise" class="btn btn-primary">Create New</a>
</div>

<ul data-testid="exerciseList">
	{#each data.exercises as exercise}
		<ListItem testId="exerciseListItem">
			{exercise.name}
		</ListItem>
	{/each}
</ul>
