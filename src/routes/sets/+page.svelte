<script lang="ts">
	import ListItem from '$lib/components/ListItem.svelte';

	export let data;
</script>

<svelte:head>
	<title>{data.workoutExercise.exercise.name}</title>
</svelte:head>

<form method="POST" class="text-center">
	<div class="flex justify-evenly">
		<div class="pb-4">
			<input
				type="text"
				name="weight"
				placeholder="Weight"
				class="input input-bordered w-full max-w-xs flex flex-col"
			/>
		</div>
		<div class="pb-4">
			<input
				type="text"
				name="reps"
				placeholder="Reps"
				class="input input-bordered w-full max-w-xs"
			/>
		</div>
		<div class="pb-4">
			<input
				type="text"
				name="rir"
				placeholder="RIR"
				class="input input-bordered w-full max-w-xs"
			/>
		</div>
	</div>
	<div>
		<button aria-label="submitSet" class="btn btn-primary w-10/12">Add</button>
	</div>
</form>

<ul>
	{#each data.workoutExercise.workoutExerciseSets as item}
		<ListItem testId="setListItem">
			{`${item.weight} x ${item.reps} x ${item.rir}`}
		</ListItem>
	{/each}
</ul>
