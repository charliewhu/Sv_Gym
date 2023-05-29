<script lang="ts">
	import ExerciseDropdown from '$lib/components/ExerciseDropdown.svelte';
	import ListItem from '$lib/components/ListItem.svelte';

	export let data;
</script>

<svelte:head>
	<title>{data.routine.name}</title>
</svelte:head>

<ExerciseDropdown action="?/create" exercises={data.exercises} />

{#if !!data.routine.RoutineExercises.length}
	<ul data-testid="exerciseList">
		{#each data.routine.RoutineExercises as routineExercise}
			<ListItem testId="exerciseListItem">
				<div class="flex flex-row justify-between items-center">
					<div>{routineExercise.Exercise.name}</div>
				</div>
			</ListItem>
		{/each}
	</ul>
{/if}
