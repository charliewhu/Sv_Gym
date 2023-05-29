<script>
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import ListItem from '$lib/components/ListItem.svelte';

	export let data;
</script>

<svelte:head>
	<title>Routines</title>
</svelte:head>

<form action="?/create" method="POST" class="text-center mb-6">
	<input
		type="text"
		name="name"
		placeholder="Name"
		class="input input-bordered w-full max-w-xs mb-2"
	/>
	<button type="submit" class="btn btn-primary">Create</button>
</form>

<ul>
	{#each data.routines as routine}
		<ListItem href={`routines/${routine.id}`} testId="routineListItem">
			<div class="flex flex-row justify-between items-center">
				<div>{routine.name}</div>
				<form action="?/startWorkout" method="POST" use:enhance>
					<input type="hidden" name="id" value={routine.id} />
					<button on:click|stopPropagation data-testid="startWorkoutBtn" class="btn btn-secondary">
						<Icon icon="codicon:debug-start" width="20" height="20" />
					</button>
				</form>
			</div>
		</ListItem>
	{/each}
</ul>
