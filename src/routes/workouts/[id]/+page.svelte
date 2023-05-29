<script lang="ts">
	import { page } from '$app/stores';
	import ExerciseDropdown from '$lib/components/ExerciseDropdown.svelte';
	import ListItem from '$lib/components/ListItem.svelte';

	export let data;
</script>

<svelte:head>
	<title>Workout {$page.params.id}</title>
</svelte:head>

<ExerciseDropdown action={`?/create`} exercises={data.exercises} />

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
