<script lang="ts">
	import { enhance } from '$app/forms';
	import SetsForm from '$lib/components/SetsForm.svelte';
	export let data;
</script>

<svelte:head>
	<title>{data.workoutExercise.Exercise.name}</title>
</svelte:head>

<SetsForm action={`?/create`} text="Add" label="submitSet" />

<ul>
	{#each data.workoutExercise.workoutExerciseSets as item}
		<li
			class="bg-neutral hover:bg-neutral-focus p-4 m-3 flex flex-row justify-between items-center"
			data-testid="setListItem"
		>
			<div>{`${item.weight} x ${item.reps} x ${item.rir}`}</div>
			<div class="flex flex-row">
				<a href={`/sets/${item.id}/update`} class="btn btn-secondary" data-testid="updateSetBtn"
					>Update</a
				>
				<form action={`?/delete`} method="POST" class="px-1" use:enhance>
					<input type="hidden" name="id" value={item.id} />
					<button class="btn btn-secondary" data-testid="deleteSetBtn">Delete</button>
				</form>
			</div>
		</li>
	{/each}
</ul>
