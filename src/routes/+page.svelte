<script lang="ts">
	import { enhance } from '$app/forms';
	import ListItem from '$lib/components/ListItem.svelte';

	export let data;
</script>

<svelte:head>
	<title>Workouts</title>
</svelte:head>

<form action={`?/create`} method="POST" use:enhance class="text-center">
	<button type="submit" aria-label="startWorkout" class="btn btn-primary mb-3">
		Start New Workout
	</button>
</form>

<ul>
	{#each data.workouts as item}
		<ListItem href={`workouts/${item.id}`} testId="workoutListItem">
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
