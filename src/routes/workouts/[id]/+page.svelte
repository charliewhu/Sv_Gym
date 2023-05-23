<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import ListItem from '$lib/components/ListItem.svelte';

	export let data;
</script>

<svelte:head>
	<title>Workout {$page.params.id}</title>
</svelte:head>

<form action={`?/create`} method="POST" use:enhance class="flex flex-row bg-white mb-4">
	<select name="exercise" aria-label="exerciseDropdown" class="select select-bordered grow mx-2">
		<option value="" />
		{#each data.exercises as item}
			<option data-testid="exerciseDropdownItem" value={item.id}>
				{item.name}
			</option>
		{/each}
	</select>
	<button aria-label="addExercise" class="btn btn-primary mx-2">Add</button>
</form>

<div class="text-center">
	<a href={`/exercises/create?workoutId=${$page.params.id}`} class="mb-4">Create New Exercise</a>
</div>

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
