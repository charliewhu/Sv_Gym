<script lang="ts">
	import ListItem from '$lib/components/ListItem.svelte';

	export let data;
</script>

<form method="POST" class="text-center">
	<select
		name="exercise"
		aria-label="exerciseDropdown"
		class="select select-bordered w-full max-w-xs"
	>
		<option value="" />
		{#each data.exercises as item}
			<option data-testid="exerciseDropdownItem" value={item.id}>
				{item.name}
			</option>
		{/each}
	</select>
	<button aria-label="addExercise" class="btn btn-primary">Add</button>
</form>

{#if !!data.workoutExercises.length}
	<ul data-testid="exerciseList">
		{#each data.workoutExercises as item}
			<ListItem
				href={`/workouts/${item.workoutId}/exercises/${item.id}`}
				testId="exerciseListItem"
				content={item.exercise.name}
			/>
		{/each}
	</ul>
{/if}
