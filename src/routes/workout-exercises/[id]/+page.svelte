<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import ListItem from '$lib/components/ListItem.svelte';
	import SetsForm from '$lib/components/SetsForm.svelte';
	export let data;

	const { enhance } = superForm(data.form);
</script>

<svelte:head>
	<title>{data.workoutExercise.Exercise.name}</title>
</svelte:head>

<SetsForm data={data.form} action={`?/create`} text="Add" label="submitSet" />

<form action={`?/previousWorkout`} method="POST" class="my-3 text-center" use:enhance>
	<input type="hidden" name="workoutExerciseId" value={data.workoutExercise.id} />
	<input type="hidden" name="exerciseId" value={data.workoutExercise.exercise} />
	<button on:click|stopPropagation class="">Repeat Previous Workout Sets</button>
</form>

<ul>
	{#each data.workoutExercise.workoutExerciseSets as item}
		<ListItem href={`sets/${item.id}/update`} testId="setListItem">
			<div class="flex flex-row justify-between items-center">
				<div>{`${item.weight} x ${item.reps} x ${item.rir}`}</div>
				<form action={`?/delete`} method="POST" class="px-1" use:enhance>
					<input type="hidden" name="id" value={item.id} />
					<button on:click|stopPropagation class="btn btn-secondary" data-testid="deleteSetBtn">
						Delete
					</button>
				</form>
			</div>
		</ListItem>
	{/each}
	{#if data.workoutExercise.workoutExerciseSets.length > 0}
		<form action={`?/repeat`} method="POST" class="mt-3 text-center" use:enhance>
			<input
				type="hidden"
				name="id"
				value={data.workoutExercise.workoutExerciseSets.slice(-1)[0].id}
			/>
			<button on:click|stopPropagation class=""> Repeat Last Set </button>
		</form>
	{/if}
</ul>
