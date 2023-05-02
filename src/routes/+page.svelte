<script lang="ts">
	import ListItem from '$lib/components/ListItem.svelte';

	export let data;
</script>

<form method="POST" action="" class="text-center mb-6">
	<button type="submit" aria-label="startWorkout" class="btn btn-primary">Start New Workout</button>
</form>

<ul>
	{#each data.workouts as item}
		<ListItem href={`workouts/${item.id}`} testId="workoutListItem" content={item.id} />
	{/each}
</ul>
