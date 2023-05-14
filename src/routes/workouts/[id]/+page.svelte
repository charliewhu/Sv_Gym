<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import ListItem from '$lib/components/ListItem.svelte';

	export let data;
</script>

<svelte:head>
	<title>Workout {$page.params.id}</title>
</svelte:head>

<form action={`?/create`} method="POST" use:enhance class="text-center">
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
			<ListItem href={`/workout-exercises/${item.id}`} testId="exerciseListItem">
				<div class="flex flex-row justify-between items-center">
					<div>{item.Exercise.name}</div>
					<form action={`?/delete`} method="POST">
						<input type="hidden" name="id" value={item.id} />
						<button
							on:click|stopPropagation
							data-testid="deleteExerciseBtn"
							class="btn btn-secondary"
						>
							Delete
						</button>
					</form>
				</div>
			</ListItem>
		{/each}
	</ul>
{/if}
