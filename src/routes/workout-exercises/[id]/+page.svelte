<script lang="ts">
	import { enhance } from '$app/forms';
	import ListItem from '$lib/components/ListItem.svelte';
	import SetsForm from '$lib/components/SetsForm.svelte';
	export let data;
</script>

<svelte:head>
	<title>{data.workoutExercise.Exercise.name}</title>
</svelte:head>

<SetsForm action={`?/create`} text="Add" label="submitSet" />

<ul>
	{#each data.workoutExercise.workoutExerciseSets as item}
		<ListItem href={`/sets/${item.id}/update`} testId="setListItem">
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
</ul>
