<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	export let data;
</script>

<svelte:head>
	<title>{data.workoutExercise.exercise.name}</title>
</svelte:head>

<form action={`${$page.url}&/create`} method="POST" use:enhance class="text-center">
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
		<li
			class="bg-neutral hover:bg-neutral-focus p-4 m-3 flex flex-row justify-between items-center"
			data-testid="setListItem"
		>
			<div>{`${item.weight} x ${item.reps} x ${item.rir}`}</div>
			<form action={`${$page.url}&/delete`} method="POST" use:enhance>
				<input type="hidden" name="id" value={item.id} />
				<button class="btn btn-secondary" data-testid="deleteSetBtn">Delete</button>
			</form>
		</li>
	{/each}
</ul>
