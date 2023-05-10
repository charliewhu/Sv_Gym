<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import ListItem from '$lib/components/ListItem.svelte';

	export let data;
</script>

<form action={`?/create`} method="POST" use:enhance class="text-center mb-6">
	<button type="submit" aria-label="startWorkout" class="btn btn-primary">Start New Workout</button>
</form>

<ul>
	{#each data.workouts as item}
		<ListItem href={`workout-exercises?workoutId=${item.id}`} testId="workoutListItem">
			<div class="flex flex-row justify-between items-center">
				<div>{item.id}</div>
				<form action={`?/delete`} method="POST" use:enhance>
					<input type="hidden" name="id" value={item.id} />
					<button on:click|stopPropagation data-testid="deleteWorkoutBtn" class="btn btn-secondary">
						Delete
					</button>
				</form>
			</div>
		</ListItem>
	{/each}
</ul>
